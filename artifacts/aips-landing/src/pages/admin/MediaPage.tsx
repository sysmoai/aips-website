// artifacts/aips-landing/src/pages/admin/MediaPage.tsx
// Admin media library — view, upload, and manage Cloudflare R2 files

import { useEffect, useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Upload, Copy, Trash2, Image, Film, FileText, ExternalLink, Check, FolderOpen } from "lucide-react";

const API = import.meta.env.VITE_API_URL ?? "";
const R2  = import.meta.env.VITE_R2_PUBLIC_URL ?? "https://media.aipremiumshop.com";
function token() { return localStorage.getItem("aips_admin_token") ?? ""; }

interface MediaFile {
  key: string;
  url: string;
  size: number;
  lastModified: string;
  contentType: string;
}

type UploadFolder = "logos" | "banners" | "blog" | "videos" | "other";

const FOLDERS: { value: UploadFolder; label: string; description: string }[] = [
  { value: "logos",   label: "Logos",   description: "Product/brand logos (square PNG, transparent BG)" },
  { value: "banners", label: "Banners", description: "Hero banners and promotional images" },
  { value: "blog",    label: "Blog",    description: "Blog post cover images and inline images" },
  { value: "videos",  label: "Videos",  description: "Product demo and explainer videos" },
  { value: "other",   label: "Other",   description: "Miscellaneous media files" },
];

function formatSize(bytes: number): string {
  if (bytes < 1024)       return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(type: string) {
  if (type.startsWith("image/")) return <Image className="w-5 h-5 text-blue-400" />;
  if (type.startsWith("video/")) return <Film className="w-5 h-5 text-purple-400" />;
  return <FileText className="w-5 h-5 text-gray-400" />;
}

export default function AdminMediaPage() {
  const [files, setFiles]         = useState<MediaFile[]>([]);
  const [loading, setLoading]     = useState(true);
  const [folder, setFolder]       = useState<UploadFolder>("logos");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [copied, setCopied]       = useState<string | null>(null);
  const [filterFolder, setFilterFolder] = useState<string>("all");
  const [deleting, setDeleting]   = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadFiles(); }, []);

  async function loadFiles() {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/media/admin`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const json = await res.json();
      setFiles(json.data ?? []);
    } catch { setFiles([]); }
    setLoading(false);
  }

  async function uploadFiles(fileList: FileList) {
    if (!fileList.length) return;
    setUploading(true); setProgress(0);
    const total = fileList.length; let done = 0;
    for (const file of Array.from(fileList)) {
      const form = new FormData();
      form.append("file", file); form.append("folder", folder);
      try {
        const res  = await fetch(`${API}/api/media/admin/upload`, {
          method: "POST", headers: { Authorization: `Bearer ${token()}` }, body: form,
        });
        const json = await res.json();
        if (json.success && json.data) setFiles(prev => [json.data, ...prev]);
      } catch (err) { console.error("Upload failed:", err); }
      done++; setProgress(Math.round((done / total) * 100));
    }
    setUploading(false); setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url); setTimeout(() => setCopied(null), 2000);
  }

  async function deleteFile(key: string) {
    if (!confirm(`Delete ${key}? This cannot be undone.`)) return;
    setDeleting(key);
    try {
      const res  = await fetch(`${API}/api/media/admin/${encodeURIComponent(key)}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token()}` },
      });
      const json = await res.json();
      if (json.success) setFiles(prev => prev.filter(f => f.key !== key));
    } catch { alert("Delete failed"); }
    setDeleting(null);
  }

  const filteredFiles = filterFolder === "all" ? files : files.filter(f => f.key.startsWith(filterFolder + "/"));
  const folderCounts = FOLDERS.reduce((acc, f) => {
    acc[f.value] = files.filter(file => file.key.startsWith(f.value + "/")).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Media Library ({files.length} files)</h1>
          <button onClick={() => inputRef.current?.click()} disabled={uploading}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? `Uploading… ${progress}%` : "Upload Files"}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Upload New Files</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
            {FOLDERS.map(f => (
              <button key={f.value} onClick={() => setFolder(f.value)} title={f.description}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors text-left ${
                  folder === f.value ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}>
                <div className="font-semibold">{f.label}</div>
                <div className={`text-xs mt-0.5 ${folder === f.value ? "text-gray-300" : "text-gray-400"}`}>{folderCounts[f.value] ?? 0} files</div>
              </button>
            ))}
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50/50 transition-colors"
            onClick={() => inputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); uploadFiles(e.dataTransfer.files); }}>
            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500"><span className="font-medium text-gray-700">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">Uploading to: <span className="font-mono font-medium text-yellow-600">/{folder}/</span></p>
            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WebP, GIF, MP4, WebM · Max 50MB per file</p>
          </div>
          <input ref={inputRef} type="file" multiple accept="image/*,video/*" className="hidden"
            onChange={e => e.target.files && uploadFiles(e.target.files)} />
          {uploading && (
            <div className="mt-3">
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">{progress}%</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {[{ value: "all", label: `All (${files.length})` }, ...FOLDERS.map(f => ({ value: f.value, label: `${f.label} (${folderCounts[f.value] ?? 0})` }))].map(tab => (
            <button key={tab.value} onClick={() => setFilterFolder(tab.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filterFolder === tab.value ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}>{tab.label}</button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading media files…</div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FolderOpen className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p className="text-lg font-medium">No files yet</p>
            <p className="text-sm mt-1">Upload your first file using the section above</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredFiles.map(file => {
              const isImage = file.contentType?.startsWith("image/");
              const isVideo = file.contentType?.startsWith("video/");
              return (
                <div key={file.key} className="group relative bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    {isImage ? (
                      <img src={file.url} alt={file.key} className="w-full h-full object-cover" loading="lazy" />
                    ) : isVideo ? (
                      <video src={file.url} className="w-full h-full object-cover" muted />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        {fileIcon(file.contentType)}
                        <span className="text-xs text-gray-400">{file.contentType?.split("/")[1]?.toUpperCase() ?? "FILE"}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <div className="text-xs text-gray-600 font-medium truncate" title={file.key}>{file.key.split("/").pop()}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{formatSize(file.size)}</div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <button onClick={() => copyUrl(file.url)} title="Copy URL"
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-gray-50 hover:bg-yellow-50 hover:text-yellow-700 text-gray-500 text-xs transition-colors">
                        {copied === file.url ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                      <a href={file.url} target="_blank" rel="noopener noreferrer" title="Open in new tab"
                        className="p-1 rounded-md bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button onClick={() => deleteFile(file.key)} disabled={deleting === file.key} title="Delete"
                        className="p-1 rounded-md bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm">
          <div className="font-semibold text-blue-800 mb-1">Cloudflare R2 Storage</div>
          <div className="text-blue-600 text-xs space-y-0.5">
            <div>Bucket: <span className="font-mono">aips-media</span> · Public URL: <span className="font-mono">{R2}</span></div>
            <div>Free tier: 10 GB storage · 10M reads/month · 1M writes/month · $0 egress fees</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
