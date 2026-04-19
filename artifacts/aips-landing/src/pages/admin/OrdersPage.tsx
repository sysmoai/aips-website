// artifacts/aips-landing/src/pages/admin/OrdersPage.tsx
// Admin order tracker — view and update all orders

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";

const API = import.meta.env.VITE_API_URL ?? "";
function token() { return localStorage.getItem("aips_admin_token") ?? ""; }
const H = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${token()}` });

interface Order {
  id: number; productName: string; price: number; status: string;
  customerName: string | null; customerPhone: string | null;
  customerEmail: string | null; notes: string | null;
  source: string; createdAt: string;
}

const STATUSES = ["pending", "contacted", "delivered", "cancelled"];
const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-800 border-yellow-200",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default function AdminOrdersPage() {
  const [orders, setOrders]     = useState<Order[]>([]);
  const [filter, setFilter]     = useState("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [notes, setNotes]       = useState("");
  const [status, setStatus]     = useState("");
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    fetch(`${API}/api/orders/admin`, { headers: H() })
      .then(r => r.json())
      .then(j => setOrders(j.data ?? []));
  }, []);

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  function openOrder(o: Order) {
    setSelected(o);
    setStatus(o.status);
    setNotes(o.notes ?? "");
  }

  async function saveOrder() {
    if (!selected) return;
    setSaving(true);
    const res = await fetch(`${API}/api/orders/admin/${selected.id}`, {
      method: "PUT", headers: H(),
      body: JSON.stringify({ status, notes }),
    });
    const json = await res.json();
    if (json.success) {
      setOrders(prev => prev.map(o => o.id === selected.id ? { ...o, status, notes } : o));
      setSelected(null);
    }
    setSaving(false);
  }

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-gray-900">Orders ({orders.length})</h1>

        {/* Status filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {["all", ...STATUSES].map(s => (
            <button
              key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === s
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              {s === "all"
                ? ` (${orders.length})`
                : ` (${orders.filter(o => o.status === s).length})`}
            </button>
          ))}
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["#", "Product", "Price", "Customer", "Status", "Date", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openOrder(o)}>
                    <td className="px-4 py-3 text-gray-400">#{o.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-[180px] truncate">{o.productName}</td>
                    <td className="px-4 py-3 font-medium">৳{o.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-500">{o.customerPhone ?? o.customerName ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[o.status] ?? ""}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {new Date(o.createdAt).toLocaleDateString("en-BD")}
                    </td>
                    <td className="px-4 py-3 text-blue-500 text-xs">Edit →</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No orders in this category</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
            <h2 className="font-bold text-lg text-gray-900">Order #{selected.id}</h2>
            <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
              <div><span className="text-gray-500">Product:</span> <span className="font-medium">{selected.productName}</span></div>
              <div><span className="text-gray-500">Price:</span> ৳{selected.price.toLocaleString()}</div>
              <div><span className="text-gray-500">Source:</span> {selected.source}</div>
              <div><span className="text-gray-500">Date:</span> {new Date(selected.createdAt).toLocaleString("en-BD")}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status} onChange={e => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400"
              >
                {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 resize-none"
                placeholder="Add internal notes..."
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={saveOrder} disabled={saving}
                className="flex-1 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 text-sm">
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button onClick={() => setSelected(null)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
