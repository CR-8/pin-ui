import { useState } from "react"
import { X, Code2, Globe, Video, Sun, Moon } from "lucide-react"

const FOOTER_DATA = {
  brand: {
    name: "STUDIO",
    tagline: "Where ideas become products.",
    watermark: "STUDIO",
  },
  newsletter: {
    heading: "Stay in the loop",
    subheading: "Get the latest updates, articles, and resources delivered to your inbox.",
    placeholder: "Enter your email",
    cta: "Subscribe",
  },
  columns: [
    {
      heading: "Navigate",
      links: [
        { label: "Home", href: "#" },
        { label: "Work", href: "#" },
        { label: "Services", href: "#" },
        { label: "About", href: "#" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "Design", href: "#" },
        { label: "Development", href: "#" },
        { label: "Branding", href: "#" },
        { label: "Strategy", href: "#" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Dribbble", href: "#" },
        { label: "GitHub", href: "#" },
      ],
    },
  ],
  social: [
    { icon: X, label: "Twitter", href: "#" },
    { icon: Code2, label: "GitHub", href: "#" },
    { icon: Globe, label: "LinkedIn", href: "#" },
    { icon: Video, label: "YouTube", href: "#" },
  ],
  copyright: "© 2024 Studio. All rights reserved.",
}

export default function Footer_2() {
  const [dark, setDark] = useState(true)
  const [email, setEmail] = useState("")

  const bg = dark ? "bg-[#0a0a0a]" : "bg-gray-50"
  const text = dark ? "text-white" : "text-gray-900"
  const muted = dark ? "text-gray-500" : "text-gray-400"
  const inputBg = dark ? "bg-[#111] border-[#222] text-white placeholder-gray-600" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"

  return (
    <div className={`h-full w-full ${bg} ${text}`}>
      <footer className="relative overflow-hidden max-w-6xl mx-auto px-6 pt-20 pb-10">
        {/* Watermark */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none`}
          aria-hidden="true"
        >
          <span
            className="text-[clamp(80px,18vw,200px)] font-black tracking-tighter leading-none"
            style={{
              background: dark
                ? "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)"
                : "linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {FOOTER_DATA.brand.watermark}
          </span>
        </div>

        {/* Brand + newsletter */}
        <div className="relative z-10 flex flex-col md:flex-row gap-12 pb-14 border-b" style={{ borderColor: dark ? "#1a1a1a" : "#e5e7eb" }}>
          <div className="flex-1">
            <h2
              className="text-4xl font-black tracking-tight mb-2"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {FOOTER_DATA.brand.name}
            </h2>
            <p className={`text-sm ${muted}`}>{FOOTER_DATA.brand.tagline}</p>
          </div>

          {/* Newsletter */}
          <div className="flex-1 max-w-md">
            <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${muted}`}>Newsletter</p>
            <h3 className={`text-lg font-semibold mb-1 ${text}`}>{FOOTER_DATA.newsletter.heading}</h3>
            <p className={`text-sm mb-4 ${muted}`}>{FOOTER_DATA.newsletter.subheading}</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={FOOTER_DATA.newsletter.placeholder}
                className={`flex-1 text-sm px-4 py-2.5 rounded-lg border outline-none transition-colors ${inputBg}`}
              />
              <button className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-linear-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity shrink-0">
                {FOOTER_DATA.newsletter.cta}
              </button>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8 py-12 border-b" style={{ borderColor: dark ? "#1a1a1a" : "#e5e7eb" }}>
          {FOOTER_DATA.columns.map((col) => (
            <div key={col.heading}>
              <p className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${muted}`}>{col.heading}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={`text-sm transition-colors ${dark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <span className={`text-xs ${muted}`}>{FOOTER_DATA.copyright}</span>
          <div className="flex items-center gap-4">
            {FOOTER_DATA.social.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className={`transition-colors ${dark ? "text-gray-600 hover:text-white" : "text-gray-400 hover:text-gray-900"}`}>
                <Icon size={17} />
              </a>
            ))}
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className={`p-1.5 rounded-md transition-colors ${dark ? "text-gray-500 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
