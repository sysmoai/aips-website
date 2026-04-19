// artifacts/aips-landing/src/pages/admin/ProductsPage.tsx
// Admin product manager — view, toggle active/featured, edit price

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Edit2, ToggleLeft, ToggleRight, Plus, Search } from "lucide-react";

const API = import.meta.env.VITE_API_URL ?? "";
function token() { return localStorage.getItem("aips_admin_token") ?? ""; }
const H = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${token()}` });

interface Product {
  id: string; name: string; category: string; price: number;
  status: string; featured: boolean; badge: string | null;
  logoUrl: string | null; accessType: string; tier: string;
}

export default function AdminProductsPage() {
  const [products, setProducts]   = useState<Product[]>([]);
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("all");
  const [editId, setEditId]       = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editBadge, setEditBadge] = useState("");

  useEffect(() => {
    fetch(`${API}/api/products/admin/all`, { headers: H() })
      .then(r => r.json())
      .then(j => setProducts(j.data ?? []));
  }, []);

  async function toggleStatus(id: string, current: string) {
    const status = current === "Active" ? "Inactive" : "Active";
    await fetch(`${API}/api/products/admin/${id}`, {
      method: "PUT", headers: H(), body: JSON.stringify({ status }),
    });
    setProducts(p => p.map(x => x.id === id ? { ...x, status } : x));
  }

  async function toggleFeatured(id: string, current: boolean) {
    await fetch(`${API}/api/products/admin/${id}`, {
      method: "PUT", headers: H(), body: JSON.stringify({ featured: !current }),
    });
    setProducts(p => p.map(x => x.id === id ? { ...x, featured: !current } : x));
  }

  async function saveEdit(id: string) {
    await fetch(`${API}/api/products/admin/${id}`, {
      method: "PUT", headers: H(),
      body: JSON.stringify({
        price: Number(editPrice),
        ...(editBadge !== "" && { badge: editBadge || null }),
      }),
    });
    setProducts(p => p.map(x =>
      x.id === id ? { ...x, price: Number(editPrice), badge: editBadge || null } : x
    ));
    setEditId(null);
  }

  const cats = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  const filtered = products.filter(p =>
    (category === "all" || p.category === category) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Products ({products.length})</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 w-64"
            />
          </div>
          <select
            value={category} onChange={e => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
          >
            {cats.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Product", "Category", "Price (৳)", "Tier", "Featured", "Active", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 max-w-[220px] truncate">{p.name}</div>
                      {p.badge && <span className="text-xs text-yellow-600 font-medium">{p.badge}</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{p.category}</td>
                    <td className="px-4 py-3">
                      {editId === p.id ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={e => setEditPrice(e.target.value)}
                          className="w-24 px-2 py-1 border border-yellow-400 rounded text-sm"
                        />
                      ) : (
                        <span className="font-medium">৳{p.price.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{p.tier}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleFeatured(p.id, p.featured)}>
                        {p.featured
                          ? <ToggleRight className="w-5 h-5 text-yellow-500" />
                          : <ToggleLeft className="w-5 h-5 text-gray-300" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStatus(p.id, p.status)}>
                        {p.status === "Active"
                          ? <ToggleRight className="w-5 h-5 text-green-500" />
                          : <ToggleLeft className="w-5 h-5 text-gray-300" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {editId === p.id ? (
                        <div className="flex gap-2">
                          <button onClick={() => saveEdit(p.id)} className="text-xs px-2 py-1 bg-green-500 text-white rounded">Save</button>
                          <button onClick={() => setEditId(null)} className="text-xs px-2 py-1 bg-gray-200 rounded">Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setEditId(p.id); setEditPrice(String(p.price)); setEditBadge(p.badge ?? ""); }}
                          className="p-1.5 hover:bg-gray-100 rounded"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
