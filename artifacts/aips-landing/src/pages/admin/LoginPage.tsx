// artifacts/aips-landing/src/pages/admin/LoginPage.tsx
import { useState } from "react";
import { useLocation } from "wouter";
const API = import.meta.env.VITE_API_URL ?? "";

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res  = await fetch(`${API}/api/admin/login`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ username, password }) });
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Login failed");
      localStorage.setItem("aips_admin_token", json.data.token);
      setLocation("/admin");
    } catch (err: any) { setError(err.message ?? "Login failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gray-900 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-yellow-400 mb-1">AIPS</div>
          <div className="text-gray-400 text-sm">Admin Dashboard</div>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 text-sm" placeholder="emon" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 text-sm" placeholder="••••••••" required />
          </div>
          {error && <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-lg transition-colors disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
