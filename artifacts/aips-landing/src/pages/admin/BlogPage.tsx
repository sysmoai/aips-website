// artifacts/aips-landing/src/pages/admin/BlogPage.tsx
// Admin blog editor — create, edit, publish, delete blog posts

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, ChevronLeft } from "lucide-react";

const API = import.meta.env.VITE_API_URL ?? "";
function token() { return localStorage.getItem("aips_admin_token") ?? ""; }
const H = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${token()}` });

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

const EMPTY_POST: Omit<BlogPost, "id" | "publishedAt" | "createdAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  published: false,
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminBlogPage() {
  const [posts, setPosts]       = useState<BlogPost[]>([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState<Partial<BlogPost> | null>(null);
  const [isNew, setIsNew]       = useState(false);
  const [saving, setSaving]     = useState(false);
  const [preview, setPreview]   = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API}/api/blog/admin/all`, { headers: H() })
      .then(r => r.json())
      .then(j => { setPosts(j.data ?? []); setLoading(false); });
  }, []);

  function openNew() {
    setEditing({ ...EMPTY_POST });
    setIsNew(true);
    setPreview(false);
  }

  function openEdit(post: BlogPost) {
    setEditing({ ...post });
    setIsNew(false);
    setPreview(false);
  }

  function handleTitleChange(title: string) {
    setEditing(prev => ({
      ...prev!,
      title,
      ...(isNew ? { slug: slugify(title) } : {}),
    }));
  }

  async function save() {
    if (!editing) return;
    if (!editing.title?.trim()) { alert("Title is required"); return; }
    if (!editing.slug?.trim())  { alert("Slug is required"); return; }
    if (!editing.content?.trim()) { alert("Content is required"); return; }

    setSaving(true);
    try {
      const url    = isNew ? `${API}/api/blog/admin` : `${API}/api/blog/admin/${editing.id}`;
      const method = isNew ? "POST" : "PUT";
      const res    = await fetch(url, { method, headers: H(), body: JSON.stringify(editing) });
      const json   = await res.json();

      if (json.success) {
        if (isNew) {
          setPosts(prev => [json.data, ...prev]);
        } else {
          setPosts(prev => prev.map(p => p.id === json.data.id ? json.data : p));
        }
        setEditing(null);
      } else {
        alert(json.error ?? "Save failed");
      }
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(post: BlogPost) {
    const res  = await fetch(`${API}/api/blog/admin/${post.id}`, {
      method: "PUT", headers: H(),
      body: JSON.stringify({ ...post, published: !post.published }),
    });
    const json = await res.json();
    if (json.success) {
      setPosts(prev => prev.map(p => p.id === post.id ? json.data : p));
    }
  }

  async function deletePost(id: number) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(id);
    const res = await fetch(`${API}/api/blog/admin/${id}`, { method: "DELETE", headers: H() });
    const json = await res.json();
    if (json.success) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
    setDeleting(null);
  }

  // ── Editor view ─────────────────────────────────────────────────────────────
  if (editing !== null) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setEditing(null)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to posts
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {preview ? <><EyeOff className="w-4 h-4" /> Edit</> : <><Eye className="w-4 h-4" /> Preview</>}
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors font-medium"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : (isNew ? "Publish / Save" : "Save Changes")}
              </button>
            </div>
          </div>

          {preview ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              {editing.coverImageUrl && (
                <img src={editing.coverImageUrl} alt="cover" className="w-full h-64 object-cover rounded-lg mb-6" />
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{editing.title || "Untitled"}</h1>
              {editing.excerpt && (
                <p className="text-lg text-gray-500 mb-6 leading-relaxed">{editing.excerpt}</p>
              )}
              <hr className="my-6 border-gray-100" />
              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {editing.content || <span className="text-gray-300 italic">No content yet…</span>}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Title *</label>
                <input
                  type="text"
                  value={editing.title ?? ""}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="Your post title…"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-lg font-medium focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Slug (URL) *</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 shrink-0">/blog/</span>
                  <input
                    type="text"
                    value={editing.slug ?? ""}
                    onChange={e => setEditing(prev => ({ ...prev!, slug: e.target.value }))}
                    placeholder="my-post-slug"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Cover Image URL</label>
                <input
                  type="url"
                  value={editing.coverImageUrl ?? ""}
                  onChange={e => setEditing(prev => ({ ...prev!, coverImageUrl: e.target.value }))}
                  placeholder="https://media.aipremiumshop.com/blog/my-image.jpg"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                />
                {editing.coverImageUrl && (
                  <img src={editing.coverImageUrl} alt="preview" className="mt-2 h-32 object-cover rounded-lg border border-gray-100" />
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Excerpt</label>
                <textarea
                  value={editing.excerpt ?? ""}
                  onChange={e => setEditing(prev => ({ ...prev!, excerpt: e.target.value }))}
                  rows={2}
                  placeholder="A short description that appears in search results and post cards…"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Content * <span className="text-gray-400 font-normal normal-case">(plain text or Markdown)</span></label>
                <textarea
                  value={editing.content ?? ""}
                  onChange={e => setEditing(prev => ({ ...prev!, content: e.target.value }))}
                  rows={20}
                  placeholder="Write your blog post here…"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono leading-relaxed focus:outline-none focus:border-yellow-400 transition-colors resize-y"
                  style={{ minHeight: "400px" }}
                />
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.published ?? false}
                    onChange={e => setEditing(prev => ({ ...prev!, published: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400" />
                </label>
                <span className="text-sm font-medium text-gray-700">
                  {editing.published ? "Published — visible on site" : "Draft — not visible on site"}
                </span>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    );
  }

  // ── Post list view ──────────────────────────────────────────────────────────
  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts ({posts.length})</h1>
          <button
            onClick={openNew}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading…</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium mb-2">No posts yet</p>
            <p className="text-sm">Click "New Post" to write your first blog article</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {posts.map(post => (
                <div key={post.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group">
                  {post.coverImageUrl ? (
                    <img src={post.coverImageUrl} alt="" className="w-14 h-10 object-cover rounded-lg shrink-0" />
                  ) : (
                    <div className="w-14 h-10 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-gray-300 text-xs">IMG</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{post.title}</div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                      <span className="font-mono">/blog/{post.slug}</span>
                      <span>·</span>
                      <span>{new Date(post.createdAt).toLocaleDateString("en-BD")}</span>
                    </div>
                  </div>
                  <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    post.published
                      ? "bg-green-50 text-green-700 border-green-100"
                      : "bg-gray-100 text-gray-500 border-gray-200"
                  }`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => togglePublish(post)} title={post.published ? "Unpublish" : "Publish"}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                      {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => openEdit(post)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deletePost(post.id)} disabled={deleting === post.id}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
