import { useState } from "react"
import { Sun, Moon } from "lucide-react"

// ─── Aurion SaaS style ────────────────────────────────────────────────────────
// Deep navy #0a1628 bg, large glowing blue radial gradient at bottom (planet/horizon)
// Top-left: circular icon + brand name + description
// Right: 4 columns of links, no headings, small white text
// No bottom bar — gradient glow dominates lower half
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_DATA = {
  brand: {
    name: "Aurion",
    description: "Streamline your business's financial management with our intuitive, scalable SaaS platform.",
  },
  columns: [
    {
      links: ["Home V.1", "Home V.2", "Home V.3", "Features"],
    },
    {
      links: ["About", "Pricing V.1", "Pricing V.2", "Pricing V.3"],
    },
    {
      links: ["Blog V.1", "Blog V.2", "Blog V.3", "Internal blog"],
    },
    {
      links: ["Sign In", "Sign Up", "Product", "Categories"],
    },
  ],
}

const NAVY = "#0a1628"

export default function Footer_6() {
  const [dark, setDark] = useState(true)

  const bg = dark ? NAVY : "#1a2a4a"
  const text = dark ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.9)"
  const muted = dark ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.45)"

  return (
    <div className="h-full w-full overflow-auto relative" style={{ background: bg, fontFamily: "Inter, sans-serif" }}>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 px-8 pt-10 pb-0">
        <div className="flex flex-col md:flex-row gap-10">

          {/* Left: brand */}
          <div className="md:w-64 shrink-0 flex flex-col gap-4">
            {/* Icon */}
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.6)" }} />
              </div>
              <span className="text-base font-semibold" style={{ color: text }}>{FOOTER_DATA.brand.name}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: muted }}>
              {FOOTER_DATA.brand.description}
            </p>
            <button onClick={() => setDark(d => !d)} className="self-start mt-2 transition-opacity hover:opacity-60" style={{ color: muted }}>
              {dark ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>

          {/* Right: 4 link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {FOOTER_DATA.columns.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-3">
                {col.links.map(link => (
                  <a key={link} href="#"
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: muted }}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Planet glow ───────────────────────────────────────────── */}
      <div className="relative mt-8" style={{ height: 200, overflow: "hidden" }}>
        {/* Outer glow */}
        <div className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: "140%",
            height: 400,
            bottom: -280,
            background: "radial-gradient(ellipse at 50% 30%, #1e6fa8 0%, #0d3a6e 30%, #061428 60%, transparent 80%)",
            filter: "blur(2px)",
          }}
        />
        {/* Inner bright core */}
        <div className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: "80%",
            height: 300,
            bottom: -240,
            background: "radial-gradient(ellipse at 50% 20%, #4db8ff 0%, #1a7abf 25%, #0a3d6e 55%, transparent 75%)",
            opacity: 0.7,
          }}
        />
        {/* Surface highlight */}
        <div className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: "60%",
            height: 200,
            bottom: -170,
            background: "radial-gradient(ellipse at 50% 15%, rgba(120,200,255,0.5) 0%, rgba(30,100,180,0.3) 40%, transparent 70%)",
          }}
        />
      </div>
    </div>
  )
}
