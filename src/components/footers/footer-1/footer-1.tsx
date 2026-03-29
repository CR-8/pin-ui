import { useState } from "react"
import { Sun, Moon, ArrowUpRight } from "lucide-react"

// ─── Retool-style footer ──────────────────────────────────────────────────────
// Dark #1a1a1a bg, blueprint grid + sky image panels at top,
// 5-column link grid, massive brand wordmark at bottom
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_DATA = {
  brand: { name: "Retool", icon: "⊞" },
  columns: [
    {
      heading: "Products",
      links: ["Apps", "Workflows", "Database", "Mobile"],
    },
    {
      heading: "Solutions",
      links: ["AI apps", "External apps", "Integrations", "Self-hosting"],
    },
    {
      heading: "Resources",
      links: ["Blog", "Reports"],
    },
    {
      heading: "Developers",
      links: ["Documentation", "Changelog", "Status", "Developer Network"],
    },
    {
      heading: "Company",
      links: ["About", "Careers", "Partners"],
    },
  ],
  cta: [
    { label: "Start for free", primary: true },
    { label: "Book a demo", primary: false },
  ],
  legal: ["Terms of use", "Privacy policy", "Security"],
  copyright: "© Retool 2024",
}

export default function Footer_1() {
  const [dark, setDark] = useState(true)

  const bg = dark ? "#1a1a1a" : "#f5f5f0"
  const text = dark ? "#ffffff" : "#111111"
  const muted = dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"
  const heading = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"
  const divider = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
  const cream = dark ? "#e8e4d9" : "#1a1a1a"
  const pillBorder = dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"

  return (
    <div className="h-full w-full overflow-auto" style={{ background: bg, color: text, fontFamily: "Inter, sans-serif" }}>

      {/* ── Top image panels ──────────────────────────────────────── */}
      <div className="flex h-52 overflow-hidden">
        {/* Left: blueprint grid */}
        <div className="w-1/2 relative overflow-hidden" style={{ background: dark ? "#111" : "#e8e4d9" }}>
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={dark ? "white" : "#333"} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Right: sky/cloud image */}
        <div className="w-1/2 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #b8d4e8 0%, #daeaf5 40%, #f0f8ff 100%)" }}>
          {/* Cloud shapes */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-90">
            <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              <ellipse cx="120" cy="100" rx="100" ry="50" fill="white" opacity="0.9"/>
              <ellipse cx="200" cy="90" rx="130" ry="60" fill="white" opacity="0.95"/>
              <ellipse cx="320" cy="105" rx="90" ry="45" fill="white" opacity="0.85"/>
            </svg>
          </div>
          <ArrowUpRight size={18} className="absolute top-4 right-4" style={{ color: muted }} />
        </div>
      </div>

      {/* ── Main footer body ──────────────────────────────────────── */}
      <div className="px-8 pt-14 pb-10">

        {/* 5-column link grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 pb-14" style={{ borderBottom: `1px solid ${divider}` }}>
          {FOOTER_DATA.columns.map(col => (
            <div key={col.heading}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-5" style={{ color: heading }}>
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[15px] font-medium transition-opacity hover:opacity-60" style={{ color: text }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom: wordmark + CTAs ───────────────────────────── */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 pt-10">

          {/* Massive wordmark */}
          <div className="flex items-center gap-4">
            {/* Icon mark */}
            <div className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl font-black shrink-0" style={{ background: cream, color: bg }}>
              ⊞
            </div>
            <span className="font-black tracking-tight leading-none" style={{ fontSize: "clamp(48px, 8cqw, 80px)", color: cream }}>
              {FOOTER_DATA.brand.name}
            </span>
          </div>

          {/* Right: CTAs + legal */}
          <div className="flex flex-col gap-3 shrink-0">
            {/* CTA buttons */}
            <div className="flex flex-col gap-2">
              {FOOTER_DATA.cta.map(btn => (
                <button
                  key={btn.label}
                  className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-80"
                  style={{
                    border: `1px solid ${pillBorder}`,
                    background: btn.primary ? cream : "transparent",
                    color: btn.primary ? bg : text,
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex flex-col gap-1.5 mt-2">
              {FOOTER_DATA.legal.map(item => (
                <a key={item} href="#" className="text-[10px] uppercase tracking-widest transition-opacity hover:opacity-80" style={{ color: muted }}>
                  {item}
                </a>
              ))}
            </div>

            <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: muted }}>
              {FOOTER_DATA.copyright}
            </p>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(d => !d)}
              className="self-start mt-1 p-1.5 rounded-md transition-opacity hover:opacity-70"
              style={{ color: muted }}
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
