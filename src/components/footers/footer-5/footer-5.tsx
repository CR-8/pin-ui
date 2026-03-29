import { useState } from "react"
import { Sun, Moon } from "lucide-react"

// ─── Dispatch AI style ────────────────────────────────────────────────────────
// Dark #1a1a1a bg, complex layout:
// Top: left sidebar nav, center CTA heading + waitlist button, right arc art + PAGES/SOCIAL links
// Bottom: large orange banner with stats + massive serif wordmark
// Very bottom: dark bar with copyright + legal
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_DATA = {
  brand: "Dispatch",
  sidebar: [
    { num: "01", label: "Intro" },
    { num: "02", label: "Capabilities" },
    { num: "03", label: "Performance" },
    { num: "04", label: "Features" },
    { num: "05", label: "Integrations" },
    { num: "06", label: "Pricing" },
    { num: "07", label: "Testimonials" },
    { num: "08", label: "Resources" },
  ],
  cta: {
    badge: "Ready to ship support ops",
    heading: ["Resolve tickets.", "Trigger actions."],
    headingColors: ["white", "#f97316"],
    description: "Connect your stack, set guardrails, and let Dispatch handle repetitive work—while your team stays in control.",
    button: "Join Waitlist",
  },
  pages: {
    heading: "Pages",
    links: ["Homepage", "Company", "Updates", "Waitlist", "Blog", "404"],
  },
  social: {
    heading: "Social",
    links: ["Telegram", "Youtube", "Linkedin", "Discord", "Github", "X"],
  },
  stats: [
    { label: "Agent Status", value: "Active" },
    { label: "Tickets Solved", value: "12,745,012" },
  ],
  description: "Dispatch is an AI operator for Support and Customer Ops. It resolves tickets, runs workflows, and keeps your CRM in sync, automatically, with full control.",
  legal: ["All rights reserved", "Terms of use", "Privacy Policy"],
  copyright: "© Dispatch AI, 2026",
}

const ORANGE = "#f97316"
const DARK = "#1a1a1a"
const DARKER = "#141414"

export default function Footer_5() {
  const [dark, setDark] = useState(true)

  const bg = dark ? DARK : "#f5f5f0"
  const text = dark ? "white" : "#111"
  const muted = dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"
  const divider = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"

  return (
    <div className="h-full w-full overflow-auto" style={{ background: bg, fontFamily: "'Inter', sans-serif", color: text }}>

      {/* ── Main content area ─────────────────────────────────────── */}
      <div className="flex" style={{ borderBottom: `1px solid ${divider}` }}>

        {/* Left sidebar */}
        <div className="hidden md:flex flex-col gap-1 px-5 py-8 shrink-0" style={{ width: 140, borderRight: `1px solid ${divider}` }}>
          {FOOTER_DATA.sidebar.map(item => (
            <a key={item.num} href="#"
              className="flex items-center gap-2 py-1.5 text-xs transition-opacity hover:opacity-100"
              style={{ color: muted }}>
              <span style={{ color: muted }}>{item.num}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Center: CTA */}
        <div className="flex-1 px-8 py-8 flex flex-col justify-between" style={{ borderRight: `1px solid ${divider}` }}>
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs" style={{ color: ORANGE }}>◇</span>
            <span className="text-xs" style={{ color: muted }}>{FOOTER_DATA.cta.badge}</span>
            <div className="flex-1 border-t border-dotted ml-2" style={{ borderColor: divider }} />
          </div>

          {/* Heading */}
          <div className="mb-6">
            {FOOTER_DATA.cta.heading.map((line, i) => (
              <h2 key={i} className="text-3xl font-bold leading-tight" style={{ color: FOOTER_DATA.cta.headingColors[i] }}>
                {line}
              </h2>
            ))}
            <p className="text-sm mt-4 leading-relaxed max-w-sm" style={{ color: muted }}>
              {FOOTER_DATA.cta.description}
            </p>
          </div>

          {/* CTA button */}
          <button className="w-full py-3 text-sm font-semibold uppercase tracking-widest rounded-sm transition-opacity hover:opacity-80"
            style={{ background: "#c8b89a", color: "#111" }}>
            {FOOTER_DATA.cta.button}
          </button>
        </div>

        {/* Right: arc art + links */}
        <div className="hidden lg:flex flex-col" style={{ width: 320 }}>
          {/* Arc decoration */}
          <div className="h-32 relative overflow-hidden" style={{ borderBottom: `1px solid ${divider}` }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 120" fill="none">
              {[0,1,2,3,4,5].map(i => (
                <path key={i} d={`M ${-20 + i*30} 120 Q ${160} ${-60 + i*20} ${340 - i*30} 120`}
                  stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
              ))}
            </svg>
          </div>

          {/* Pages + Social */}
          <div className="flex gap-8 px-6 py-8 flex-1">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: muted }}>
                {FOOTER_DATA.pages.heading}
              </p>
              <div className="flex flex-col gap-2.5">
                {FOOTER_DATA.pages.links.map(link => (
                  <a key={link} href="#" className="text-sm transition-opacity hover:opacity-60" style={{ color: text }}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: muted }}>
                {FOOTER_DATA.social.heading}
              </p>
              <div className="flex flex-col gap-2.5">
                {FOOTER_DATA.social.links.map(link => (
                  <a key={link} href="#" className="text-sm transition-opacity hover:opacity-60" style={{ color: text }}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Orange banner ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: ORANGE, minHeight: 160 }}>
        {/* Stats row */}
        <div className="flex items-start gap-12 px-8 pt-6 pb-2 relative z-10">
          {FOOTER_DATA.stats.map(stat => (
            <div key={stat.label}>
              <p className="text-2xl font-black" style={{ color: "#111" }}>{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(0,0,0,0.5)" }}>{stat.label}</p>
            </div>
          ))}
          <div className="flex-1" />
          <p className="text-sm max-w-xs leading-relaxed pt-1" style={{ color: "rgba(0,0,0,0.6)" }}>
            {FOOTER_DATA.description}
          </p>
        </div>

        {/* Massive wordmark */}
        <div className="px-4 pb-0 overflow-hidden">
          <span className="font-black leading-none select-none block"
            style={{ fontSize: "clamp(60px, 14cqw, 120px)", color: "rgba(0,0,0,0.25)", letterSpacing: "-0.02em", fontFamily: "Georgia, serif" }}>
            {FOOTER_DATA.brand}
          </span>
        </div>

        {/* Diamond icons */}
        <span className="absolute left-4 bottom-4 text-black/30 text-lg">◇</span>
        <span className="absolute right-1/2 bottom-8 text-black/20 text-sm">◇</span>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 py-4" style={{ background: DARKER, borderTop: `1px solid ${divider}` }}>
        <span className="text-xs" style={{ color: muted }}>{FOOTER_DATA.copyright}</span>
        <div className="flex items-center gap-6">
          {FOOTER_DATA.legal.map(item => (
            <a key={item} href="#" className="text-xs transition-opacity hover:opacity-80" style={{ color: muted }}>{item}</a>
          ))}
          <span className="text-xs" style={{ color: ORANGE }}>◇</span>
        </div>
        <button onClick={() => setDark(d => !d)} style={{ color: muted }}>
          {dark ? <Sun size={13} /> : <Moon size={13} />}
        </button>
      </div>
    </div>
  )
}
