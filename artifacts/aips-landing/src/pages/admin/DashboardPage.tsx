// artifacts/aips-landing/src/pages/admin/DashboardPage.tsx
// Admin home — stats overview + recent orders

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Package, ShoppingCart, TrendingUp, Clock } from "lucide-react";

const API = import.meta.env.VITE_API_URL ?? "";

function token() { return localStorage.getItem("aips_admin_token") ?? ""; }

interface Stats {
  total: number; pending: number; contacted: number;
  delivered: number; cancelled: number; totalRevenueBDT: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats]   = useState<Stats | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const h = { Authorization: `Bearer ${token()}` };
    fetch(`${API}/api/orders/admin/stats`, { headers: h })
      .then(r => r.json()).then(j => setStats(j.data));
    fetch(`${API}/api/orders/admin`, { headers: h })
      .then(r => r.json()).then(j => setOrders((j.data ?? []).slice(0, 10)));
  }, []);

  const cards = stats ? [
    { label: "Total Orders",     value: stats.total,                      icon: ShoppingCart, color: "bg-blue-500" },
    { label: "Pending",          value: stats.pending,                    icon: Clock,        color: "bg-yellow-500" },
    { label: "Delivered",        value: stats.delivered,                  icon: Package,      color: "bg-green-500" },
    { label: "Revenue (BDT)",    value: `৳${stats.totalRevenueBDT.toLocaleString()}`, icon: TrendingUp, color: "bg-purple-500" },
  ] : [];

  const statusColor: Record<string, string> = {
    pending:   "bg-yellow-100 text-yellow-800",
    contacted: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["#", "Product", "Price", "Status", "Date"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">#{o.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">{o.productName}</td>
                    <td className="px-4 py-3 text-gray-700">৳{o.price.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[o.status] ?? "bg-gray-100 text-gray-700"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString("en-BD")}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No orders yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
