import { useState } from "react"
import { ArrowRight, Sun, Moon } from "lucide-react"

// ─── Undercat agency style ────────────────────────────────────────────────────
// White page bg, dark #1c1c1c rounded card
// Logo + tagline left, nav links center-left, social center, legal right
// Bottom: large newsletter heading + pill email input, back to top button
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_DATA = {
  brand: { name: "undercat", tagline: "A digital agency that delivers" },
  nav: ["Process", "Services", "Showcase", "Pricing"],
  social: ["X", "Dribbble", "Pinterest", "Linkedin"],
  legal: ["Terms & Conditions", "Privacy Policy", "Cookie Policy"],
  newsletter: { heading: "Undercat\nin your mailbox", placeholder: "name@example.com" },
  contact: { email: "ag@undercat.io", name: "Undercat", copy: "2024 © All rights reserved" },
  backToTop: "Back to top",
}

export default function Footer_3() {
  const [dark, setDark] = useState(false)
  const [email, setEmail] = useState("")

  const pageBg = dark ? "#111" : "#ffffff"
  const cardBg = dark ? "#1c1c1c" : "#1c1c1c"

  return (
    <div className="h-full w-full overflow-auto" style={{ background: pageBg, fontFamily: "Inter, sans-serif" }}>
      <div className="p-4 md:p-6">
        <div className="rounded-2xl overflow-hidden" style={{ background: cardBg }}>
          <div className="px-8 py-10">

            {/* ── Top section ──────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

              {/* Brand */}
              <div className="flex flex-col gap-2">
                <span className="text-xl font-bold text-white tracking-tight">{FOOTER_DATA.brand.name}</span>
                <span className="text-sm text-white/40">{FOOTER_DATA.brand.tagline}</span>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-3">
                {FOOTER_DATA.nav.map(link => (
                  <a key={link} href="#" className="text-[15px] text-white hover:text-white/60 transition-colors">{link}</a>
                ))}
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-3">
                {FOOTER_DATA.social.map(link => (
                  <a key={link} href="#" className="text-[15px] text-white hover:text-white/60 transition-colors">{link}</a>
                ))}
              </div>

              {/* Legal */}
              <div className="flex flex-col gap-3">
                {FOOTER_DATA.legal.map(link => (
                  <a key={link} href="#" className="text-[15px] text-white/40 hover:text-white/70 transition-colors">{link}</a>
                ))}
              </div>
            </div>

            {/* ── Bottom section ────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 pt-10">

              {/* Back to top */}
              <div className="flex flex-col justify-end">
                <button className="flex items-center gap-3 px-5 py-2.5 rounded-full border text-sm text-white transition-opacity hover:opacity-70"
                  style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  {FOOTER_DATA.backToTop}
                  <span className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                    ↑
                  </span>
                </button>
              </div>

              {/* Newsletter */}
              <div className="flex-1 max-w-sm">
                <h3 className="text-2xl font-bold text-white leading-tight mb-5 whitespace-pre-line">
                  {FOOTER_DATA.newsletter.heading}
                </h3>
                <div className="flex items-center gap-0 rounded-full border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={FOOTER_DATA.newsletter.placeholder}
                    className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder-white/30 outline-none"
                  />
                  <button className="w-10 h-10 rounded-full flex items-center justify-center mr-1 transition-opacity hover:opacity-70"
                    style={{ background: "rgba(255,255,255,0.15)" }}>
                    <ArrowRight size={16} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Contact + copyright */}
              <div className="flex flex-col gap-1 text-right">
                <a href={`mailto:${FOOTER_DATA.contact.email}`} className="text-sm text-white/60 hover:text-white transition-colors">
                  {FOOTER_DATA.contact.email}
                </a>
                <span className="text-sm text-white/40">{FOOTER_DATA.contact.name}</span>
                <span className="text-sm text-white/40">{FOOTER_DATA.contact.copy}</span>
                <button onClick={() => setDark(d => !d)} className="self-end mt-2 text-white/30 hover:text-white/60 transition-colors">
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
