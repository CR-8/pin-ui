import { useState } from "react"
import { ArrowUpRight, Sun, Moon } from "lucide-react"

// ─── Leeuwarder Golfclub style ────────────────────────────────────────────────
// Cream top section with partner logos, dark rounded card footer below
// Centered brand mark + name, contact left, social center, nav right
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_DATA = {
  partners: {
    heading: "Our proud partners",
    cta: "Become a partner",
    logos: ["Partner A", "Heineken", "NS Steden", "Lippe Wonen", "NIVO", "Sligro"],
  },
  brand: {
    name: "Leeuwarder\nGolfclub",
    tagline: "Where golf happiness begins",
  },
  contact: {
    heading: "Contact",
    address: "Woelwijk 101,\n8926 XD Leeuwarden",
    phone: "0511 - 43 22 99",
    email: "info@leeuwardergolfclub.nl",
  },
  social: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  cta: [
    { label: "Reserve tee time", href: "#" },
    { label: "Become a member", href: "#" },
  ],
  nav: {
    heading: "Quick links",
    columns: [
      ["Our club", "For guests", "Start with Golf"],
      ["The course", "Our events", "Contact"],
    ],
  },
  legal: ["Cookies policy", "Privacy policy"],
  copyright: "©2025",
}

const GREEN = "#1a4a2e"
const LIGHT_GREEN = "#2d7a4a"
const ACCENT = "#00e676"
const CREAM = "#f5f0d8"

export default function Footer_2() {
  const [dark, setDark] = useState(false)

  return (
    <div className="h-full w-full overflow-auto" style={{ background: dark ? "#111" : "#e8f4e8", fontFamily: "Inter, sans-serif" }}>

      {/* ── Partners section (cream/light bg) ─────────────────────── */}
      <div className="px-8 py-12" style={{ background: dark ? "#1a1a1a" : CREAM }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-4" style={{ color: dark ? "white" : "#111" }}>
            {FOOTER_DATA.partners.heading}
          </h2>
          <div className="flex justify-center mb-8">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm border transition-opacity hover:opacity-70"
              style={{ borderColor: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", color: dark ? "white" : "#111" }}>
              {FOOTER_DATA.partners.cta}
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs" style={{ background: ACCENT, color: "#111" }}>→</span>
            </button>
          </div>
          {/* Partner logo cards */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {FOOTER_DATA.partners.logos.map(logo => (
              <div key={logo} className="shrink-0 w-36 h-24 rounded-xl flex items-center justify-center text-sm font-semibold text-white/70"
                style={{ background: GREEN }}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer card ──────────────────────────────────────── */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl overflow-hidden" style={{ background: dark ? "#1c1c1c" : "#1e1e1e" }}>
          <div className="px-8 pt-10 pb-8">

            {/* Brand center */}
            <div className="flex flex-col items-center mb-10">
              {/* Illustrated mark placeholder */}
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "linear-gradient(135deg, #00e676, #1a4a2e)" }}>
                ✦
              </div>
              <h2 className="text-3xl font-black text-white text-center leading-tight whitespace-pre-line mb-1">
                {FOOTER_DATA.brand.name}
              </h2>
              <p className="text-sm italic text-white/50">{FOOTER_DATA.brand.tagline}</p>
            </div>

            {/* Three-column bottom layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Left: Contact + social */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-sm font-bold text-white mb-2">{FOOTER_DATA.contact.heading}</p>
                  <p className="text-sm text-white/50 whitespace-pre-line leading-relaxed">{FOOTER_DATA.contact.address}</p>
                  <p className="text-sm text-white/50 mt-1">{FOOTER_DATA.contact.phone}</p>
                  <a href="#" className="text-sm underline mt-1 block" style={{ color: ACCENT }}>{FOOTER_DATA.contact.email}</a>
                </div>
                <div className="flex flex-col gap-2">
                  {FOOTER_DATA.social.map(s => (
                    <a key={s.label} href={s.href} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                      {s.label} <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Center: CTA buttons */}
              <div className="flex flex-col items-center justify-center gap-3">
                {FOOTER_DATA.cta.map(btn => (
                  <a key={btn.label} href={btn.href}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80"
                    style={{ background: LIGHT_GREEN }}>
                    {btn.label}
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: ACCENT, color: "#111" }}>→</span>
                  </a>
                ))}
              </div>

              {/* Right: Quick nav */}
              <div>
                <p className="text-sm font-bold text-white mb-3">{FOOTER_DATA.nav.heading}</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                  {FOOTER_DATA.nav.columns.flat().map(link => (
                    <a key={link} href="#" className="text-sm text-white/50 hover:text-white transition-colors">{link}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: ACCENT, color: "#111" }}>7.0</span>
                <span className="text-xs text-white/30">Leadingcourses score</span>
              </div>
              <div className="flex items-center gap-4">
                {FOOTER_DATA.legal.map(l => (
                  <a key={l} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">{l}</a>
                ))}
                <span className="text-xs text-white/30">{FOOTER_DATA.copyright}</span>
                <button onClick={() => setDark(d => !d)} className="text-white/30 hover:text-white/60 transition-colors">
                  {dark ? <Sun size={13} /> : <Moon size={13} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
