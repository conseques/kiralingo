import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import dotenv from "dotenv";

dotenv.config();

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME
} = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_BUCKET_NAME) {
  console.error("❌ Missing AWS credentials in .env file");
  process.exit(1);
}

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const DIST_DIR = path.resolve("dist");

async function walk(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      files = files.concat(await walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function deploy() {
  console.log("🚀 Starting deployment to S3...");
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error("❌ Dist directory not found. Run 'npm run build' first.");
    process.exit(1);
  }

  const files = await walk(DIST_DIR);
  
  for (const filePath of files) {
    const relativePath = path.relative(DIST_DIR, filePath);
    const fileStream = fs.createReadStream(filePath);
    const contentType = mime.lookup(filePath) || "application/octet-stream";

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: relativePath,
      Body: fileStream,
      ContentType: contentType,
    };

    try {
      await s3Client.send(new PutObjectCommand(uploadParams));
      console.log(`✅ Uploaded: ${relativePath} (${contentType})`);
    } catch (err) {
      console.error(`❌ Error uploading ${relativePath}:`, err.message);
    }
  }

  console.log("\n✨ Deployment complete!");
  console.log(`🔗 Link: http://${AWS_BUCKET_NAME}.s3-website.${AWS_REGION}.amazonaws.com/ (if static website hosting is enabled)`);
}

deploy();
