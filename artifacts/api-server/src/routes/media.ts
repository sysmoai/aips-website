// artifacts/api-server/src/routes/media.ts
// Media management via Cloudflare R2 (S3-compatible API)
// Deps: @aws-sdk/client-s3, multer
// Env vars: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_KEY, R2_BUCKET, R2_PUBLIC_URL

import { Router, Request, Response } from "express";
import { S3Client, ListObjectsV2Command, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import { requireAuth } from "../middleware/auth.js";

export const mediaRouter = Router();

function getR2(): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "", secretAccessKey: process.env.R2_SECRET_KEY ?? "" },
  });
}
const BUCKET = () => process.env.R2_BUCKET ?? "aips-media";
const PUBLIC_URL = () => process.env.R2_PUBLIC_URL ?? "https://media.aipremiumshop.com";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) cb(null, true);
    else cb(new Error("Only image and video files allowed"));
  },
});

function sanitize(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");
}
function guessType(key: string) {
  const ext = key.split(".").pop()?.toLowerCase();
  const map: Record<string,string> = { png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",svg:"image/svg+xml",mp4:"video/mp4",webm:"video/webm",mov:"video/quicktime" };
  return map[ext??"] ?? "application/octet-stream";
}

// GET /api/media/admin — list all files
mediaRouter.get("/admin", requireAuth, async (_req, res) => {
  try {
    const out = await getR2().send(new ListObjectsV2Command({ Bucket: BUCKET(), MaxKeys: 1000 }));
    const files = (out.Contents??[]).map(o => ({ key:o.Key??"", url:`${PUBLIC_URL()}/${o.Key}`, size:o.Size??0, lastModified:o.LastModified?.toISOString()??"", contentType:guessType(o.Key??"") }));
    res.json({ success: true, data: files });
  } catch (err: any) { res.status(500).json({ success: false, error: err.message }); }
});

// POST /api/media/admin/upload — upload file
mediaRouter.post("/admin/upload", requireAuth, upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) { res.status(400).json({ success: false, error: "No file" }); return; }
    const folder = (req.body.folder as string) || "other";
    const key = `${folder}/${sanitize(req.file.originalname)}`;
    await getR2().send(new PutObjectCommand({ Bucket: BUCKET(), Key: key, Body: req.file.buffer, ContentType: req.file.mimetype }));
    res.json({ success: true, data: { key, url: `${PUBLIC_URL()}/${key}`, size: req.file.size, lastModified: new Date().toISOString(), contentType: req.file.mimetype } });
  } catch (err: any) { res.status(500).json({ success: false, error: err.message }); }
});

// DELETE /api/media/admin/:key
mediaRouter.delete("/admin/:key(*)", requireAuth, async (req: Request, res: Response) => {
  try {
    await getR2().send(new DeleteObjectCommand({ Bucket: BUCKET(), Key: req.params.key }));
    res.json({ success: true, message: `Deleted ${req.params.key}` });
  } catch (err: any) { res.status(500).json({ success: false, error: err.message }); }
});
