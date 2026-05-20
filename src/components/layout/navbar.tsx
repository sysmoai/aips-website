"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi AI Premium Shop, I want to order a premium subscription."
)}`;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Official brand logo for navbar — navy IconInBox + gold/white/gold wordmark.
 * Matches the canonical BrandLogoLocked from the brand system.
 */
function NavbarLogo() {
  const size = 36;
  const scale = 0.62;
  const borderRadius = +(size * 0.225).toFixed(2);
  const innerPadPercent = (1 - scale) / 2;

  return (
    <div className="flex items-center gap-3">
      {/* IconInBox — canonical brand mark container */}
      <div
        aria-label="AI Premium Shop"
        role="img"
        className="relative shrink-0"
        style={{
          width: size,
          height: size,
          borderRadius,
          background:
            "radial-gradient(120% 120% at 30% 0%, #1c2350 0%, #151b3d 55%, #0a0e27 100%)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,.06) inset, 0 2.88px 7.92px -2.88px rgba(0,0,0,.55), 0 0.72px 2.16px -0.72px rgba(0,0,0,.4), inset 0 0 0 0.75px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.14)",
        }}
      >
        {/* Gloss highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 65%)",
          }}
        />
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/icon.png"
            alt=""
            draggable={false}
            decoding="sync"
            className="block select-none"
            style={{
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              objectFit: "contain",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,.35))",
            }}
          />
        </div>
      </div>

      {/* Wordmark — AI (gold) PREMIUM (white) SHOP (gold) */}
      <div className="flex flex-col">
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            fontSize: "0.8125rem",
            lineHeight: 1.2,
            fontWeight: 800,
            letterSpacing: "0.12em",
            gap: "0.35em",
          }}
        >
          <span style={{ color: "#f4b942" }}>AI</span>
          <span style={{ color: "#FFFFFF" }}>PREMIUM</span>
          <span style={{ color: "#f4b942" }}>SHOP</span>
        </div>
        <span
          className="text-[0.625rem] font-medium tracking-[0.15em] uppercase leading-tight mt-0.5"
          style={{ color: "#5b6280" }}
        >
          Digital subscriptions in BD
        </span>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0e27]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link href="/" className="group">
            <NavbarLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-200 rounded-lg ${
                    active
                      ? "text-[#f4b942]"
                      : "text-[#8a91a8] hover:text-white"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#f4b942] to-[#e8a838]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp h-9 px-4 text-[0.8125rem]"
            >
              <MessageCircle className="size-4" />
              Order Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-xl text-[#8a91a8] transition hover:bg-white/[0.06] hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-[#0a0e27]/95 backdrop-blur-xl">
            <nav className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
              <div className="grid gap-1">
                {navLinks.map(({ href, label }) => {
                  const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[0.875rem] font-medium transition-colors ${
                        active
                          ? "bg-white/[0.06] text-[#f4b942]"
                          : "text-[#8a91a8] hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full h-11"
                >
                  <MessageCircle className="size-4" />
                  Order on WhatsApp
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
