import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "GitHub Copilot vs Cursor Pro in Bangladesh (2026) — Best AI Code Editor?",
  description:
    "GitHub Copilot vs Cursor Pro for Bangladeshi developers. Compare features, pricing in BDT, and which AI code editor boosts productivity more. bKash payment available.",
  canonical: "https://aipremiumshop.com/copilot-vs-cursor",
});

export default function CopilotVsCursorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Copilot vs Cursor", path: "/copilot-vs-cursor" },
        ]}
      />
      <main className="min-h-screen bg-[#f7f7f2] text-[#171713]">
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold leading-tight text-[#141410] sm:text-5xl">
            GitHub Copilot vs Cursor Pro in Bangladesh (2026)
          </h1>
          <p className="mt-4 text-lg leading-7 text-[#5c5a4e]">
            For developers, CS students, and startup founders in Bangladesh. Prices in BDT.
          </p>

          <div className="mt-8 rounded-lg border border-[#d7d5c9] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#171713]">Quick Answer</h2>
            <p className="mt-2 text-[#4f4d42]">
              <strong>Choose GitHub Copilot</strong> (৳1,495–৳5,831/mo) if you want deep IDE
              integration, the largest training dataset, and seamless GitHub workflow.
              <strong>Choose Cursor Pro</strong> (৳2,990–৳8,970/mo) if you want the most
              powerful AI-native code editor with codebase-wide understanding and agentic editing.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#dfded4]">
                  <th className="py-3 pr-4 font-semibold text-[#171713]">Feature</th>
                  <th className="py-3 pr-4 font-semibold text-[#171713]">GitHub Copilot</th>
                  <th className="py-3 pr-4 font-semibold text-[#171713]">Cursor Pro</th>
                </tr>
              </thead>
              <tbody className="text-[#4f4d42]">
                <tr className="border-b border-[#e8e7df]">
                  <td className="py-3 pr-4 font-medium">Price (BD)</td>
                  <td className="py-3 pr-4">৳1,495 – ৳5,831/mo</td>
                  <td className="py-3 pr-4">৳2,990 – ৳8,970/mo</td>
                </tr>
                <tr className="border-b border-[#e8e7df]">
                  <td className="py-3 pr-4 font-medium">Best For</td>
                  <td className="py-3 pr-4">Inline completions, GitHub integration</td>
                  <td className="py-3 pr-4">Full AI-native editor experience</td>
                </tr>
                <tr className="border-b border-[#e8e7df]">
                  <td className="py-3 pr-4 font-medium">IDE</td>
                  <td className="py-3 pr-4">VS Code, JetBrains, Vim, Neovim</td>
                  <td className="py-3 pr-4">Cursor (VS Code fork) only</td>
                </tr>
                <tr className="border-b border-[#e8e7df]">
                  <td className="py-3 pr-4 font-medium">Codebase Understanding</td>
                  <td className="py-3 pr-4">Good (file-level context)</td>
                  <td className="py-3 pr-4">Excellent (entire codebase indexing)</td>
                </tr>
                <tr className="border-b border-[#e8e7df]">
                  <td className="py-3 pr-4 font-medium">Agentic Editing</td>
                  <td className="py-3 pr-4">Limited (Copilot Edits)</td>
                  <td className="py-3 pr-4">Advanced (Composer, Agent mode)</td>
                </tr>
                <tr className="border-b border-[#e8e7df]">
                  <td className="py-3 pr-4 font-medium">Models</td>
                  <td className="py-3 pr-4">GPT-4, Codex</td>
                  <td className="py-3 pr-4">GPT-4, Claude, Cursor-specific models</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-[#dfded4] bg-white p-6">
              <h3 className="text-xl font-semibold text-[#171713]">GitHub Copilot</h3>
              <p className="mt-2 text-2xl font-bold text-[#171713]">৳1,495/mo</p>
              <Link
                href="/products/github-copilot-bangladesh"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-[#171713] px-4 text-sm font-semibold text-white"
              >
                View Copilot Plans
              </Link>
            </div>
            <div className="rounded-lg border border-[#dfded4] bg-white p-6">
              <h3 className="text-xl font-semibold text-[#171713]">Cursor Pro</h3>
              <p className="mt-2 text-2xl font-bold text-[#171713]">৳2,990/mo</p>
              <Link
                href="/products/cursor-bangladesh"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-[#171713] px-4 text-sm font-semibold text-white"
              >
                View Cursor Plans
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
