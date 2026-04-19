// artifacts/aips-landing/src/components/admin/AdminLayout.tsx
// Sidebar layout for all admin pages

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Package, ShoppingCart, BookOpen, Image, Settings, LogOut, Menu, ChevronRight } from "lucide-react";

const NAV = [
  { href: "/admin",          label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products",  icon: Package },
  { href: "/admin/orders",   label: "Orders",    icon: ShoppingCart },
  { href: "/admin/blog",     label: "Blog",      icon: BookOpen },
  { href: "/admin/media",    label: "Media",     icon: Image },
  { href: "/admin/settings", label: "Settings",  icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  function logout() {
    localStorage.removeItem("aips_admin_token");
    window.location.href = "/admin/login";
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-gray-900 text-white w-64 shrink-0">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-800">
        <span className="text-xl font-bold text-yellow-400">AIPS</span>
        <span className="text-sm text-gray-400">Admin</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = location === href || (href !== "/admin" && location.startsWith(href));
          return (
            <Link key={href} href={href}>
              <a onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-yellow-400 text-gray-900" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </a>
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-800">
        <button onClick={logout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="hidden md:flex"><Sidebar /></div>
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex w-64"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 md:hidden">
          <button onClick={() => setOpen(true)} className="p-1"><Menu className="w-5 h-5" /></button>
          <span className="font-bold text-yellow-500">AIPS Admin</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
