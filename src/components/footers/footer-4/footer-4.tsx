import { useState } from "react"
import { Sun, Moon } from "lucide-react"

// ─── Nietzsche / Joey Med style ───────────────────────────────────────────────
// Light gray page bg, two stacked rounded cards:
// Top: blue-teal gradient CTA card with heading + two buttons
// Bottom: white card, logo + newsletter left, 5 link columns right, copyright bar
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_DATA = {
  cta: {
    heading: "Ready to Take Control\nof Your Health?",
    subheading: "Get expert care for weight loss, sexual health, wellness, and more — all from the comfort of home, no insurance needed.",
    buttons: [
      { label: "Start Now", primary: true },
      { label: "Contact Us", primary: false },
    ],
  },
  brand: { name: "Nietzsche", icon: "✳" },
  newsletter: {
    label: "Sign up to receive health tips.",
    placeholder: "Enter you email",
    cta: "Submit",
    disclaimer: "By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.",
  },
  columns: [
    {
      heading: "Care Plans",
      links: ["Sexual Health", "Weight Loss", "Travel Kit"],
    },
    {
      heading: "Learn",
      links: ["Blogs", "Research & Education", "Certifications"],
    },
    {
      heading: "About",
      links: ["Providers", "About Us"],
    },
    {
      heading: "Support",
      links: ["FAQ's", "Contact Us"],
    },
    {
      heading: "Legal",
      links: ["Terms & Conditions", "Privacy Policy", "Risk & Benefits", "Telehealth Consent", "Prescription Policy"],
    },
  ],
  copyright: "© 2025 joey med. All rights reserved.",
}

export default function Footer_4() {
  const [dark, setDark] = useState(false)
  const [email, setEmail] = useState("")

  const pageBg = dark ? "#1a1a1a" : "#f0f0f0"
  const cardBg = dark ? "#222" : "#ffffff"
  const text = dark ? "#ffffff" : "#111111"
  const muted = dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"
  const inputBorder = dark ? "rgba(255,255,255,0.15)" : "#d1d5db"

  return (
    <div className="h-full w-full overflow-auto" style={{ background: pageBg, fontFamily: "Inter, sans-serif" }}>
      <div className="p-4 md:p-6 flex flex-col gap-3">

        {/* ── Top CTA card ─────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden p-10 flex flex-col items-center text-center"
          style={{ background: dark ? "linear-gradient(135deg, #1a2a4a 0%, #0d2a3a 100%)" : "linear-gradient(135deg, #c8dff5 0%, #b8e8f0 50%, #a8d8e8 100%)" }}>
          <h2 className="text-3xl font-bold leading-tight mb-3 whitespace-pre-line" style={{ color: dark ? "white" : "#111" }}>
            {FOOTER_DATA.cta.heading}
          </h2>
          <p className="text-sm max-w-md mb-6 leading-relaxed" style={{ color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)" }}>
            {FOOTER_DATA.cta.subheading}
          </p>
          <div className="flex items-center gap-3">
            {FOOTER_DATA.cta.buttons.map(btn => (
              <button key={btn.label}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                  background: btn.primary ? "#2563eb" : (dark ? "rgba(255,255,255,0.1)" : "white"),
                  color: btn.primary ? "white" : (dark ? "white" : "#111"),
                  border: btn.primary ? "none" : `1px solid ${dark ? "rgba(255,255,255,0.2)" : "#d1d5db"}`,
                }}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bottom footer card ────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: cardBg }}>
          <div className="px-8 py-8">

            {/* Top row: logo + newsletter + columns */}
            <div className="flex flex-col lg:flex-row gap-10">

              {/* Left: brand + newsletter */}
              <div className="lg:w-64 shrink-0 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <span className="text-lg" style={{ color: "#2563eb" }}>{FOOTER_DATA.brand.icon}</span>
                  <span className="text-base font-semibold" style={{ color: text }}>{FOOTER_DATA.brand.name}</span>
                </div>
                <div>
                  <p className="text-sm mb-3" style={{ color: muted }}>{FOOTER_DATA.newsletter.label}</p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={FOOTER_DATA.newsletter.placeholder}
                      className="flex-1 text-sm px-3 py-2 rounded-lg outline-none"
                      style={{ border: `1px solid ${inputBorder}`, background: dark ? "rgba(255,255,255,0.05)" : "#f9fafb", color: text }}
                    />
                    <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-80"
                      style={{ background: "#111827" }}>
                      {FOOTER_DATA.newsletter.cta}
                    </button>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: muted }}>
                    {FOOTER_DATA.newsletter.disclaimer}
                  </p>
                </div>
              </div>

              {/* Right: link columns */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {FOOTER_DATA.columns.map(col => (
                  <div key={col.heading}>
                    <p className="text-[12px] font-semibold mb-3" style={{ color: text }}>{col.heading}</p>
                    <ul className="flex flex-col gap-2">
                      {col.links.map(link => (
                        <li key={link}>
                          <a href="#" className="text-[13px] transition-opacity hover:opacity-60" style={{ color: muted }}>{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider + copyright */}
            <div className="mt-8 pt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}` }}>
              <p className="text-[12px]" style={{ color: muted }}>{FOOTER_DATA.copyright}</p>
              <button onClick={() => setDark(d => !d)} className="transition-opacity hover:opacity-60" style={{ color: muted }}>
                {dark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
