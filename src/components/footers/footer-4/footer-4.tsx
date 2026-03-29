import { useState } from "react"
import { X, Code2, Globe, ArrowUpRight, Sun, Moon } from "lucide-react"

const FOOTER_DATA = {
  cta: {
    heading: "Let's work\ntogether.",
    email: "hello@forge.studio",
    emailHref: "mailto:hello@forge.studio",
  },
  brand: "Forge",
  columns: [
    {
      heading: "Work",
      links: [
        { label: "Projects", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Process", href: "#" },
      ],
    },
    {
      heading: "Studio",
      links: [
        { label: "About", href: "#" },
        { label: "Team", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      heading: "Social",
      links: [
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "GitHub", href: "#" },
      ],
    },
  ],
  social: [
    { icon: X, label: "Twitter", href: "#" },
    { icon: Code2, label: "GitHub", href: "#" },
    { icon: Globe, label: "LinkedIn", href: "#" },
  ],
  copyright: "© 2024 Forge Studio",
  location: "Based in San Francisco, CA",
}

export default function Footer_4() {
  const [dark, setDark] = useState(true)

  const bg = dark ? "bg-[#0d0d0d]" : "bg-[#f5f5f0]"
  const text = dark ? "text-white" : "text-gray-900"
  const muted = dark ? "text-gray-500" : "text-gray-400"
  const divider = dark ? "#1e1e1e" : "#d4d4c8"

  return (
    <div className={`h-full w-full ${bg} ${text}`}>
      <footer className="max-w-6xl mx-auto px-8 pt-20 pb-10">
        {/* Big CTA heading */}
        <div className="mb-12">
          <h2
            className="text-[clamp(48px,8vw,96px)] font-black leading-none tracking-tighter whitespace-pre-line"
          >
            {FOOTER_DATA.cta.heading}
          </h2>
        </div>

        {/* Email link */}
        <a
          href={FOOTER_DATA.cta.emailHref}
          className={`group inline-flex items-center gap-3 text-[clamp(18px,3vw,32px)] font-medium border-b pb-1 mb-16 transition-opacity hover:opacity-70 ${dark ? "border-white/20" : "border-gray-900/20"}`}
        >
          {FOOTER_DATA.cta.email}
          <ArrowUpRight size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>

        {/* Divider */}
        <div className="h-px mb-12" style={{ backgroundColor: divider }} />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          {/* Brand + location */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold">{FOOTER_DATA.brand}</span>
            <span className={`text-sm ${muted}`}>{FOOTER_DATA.location}</span>
          </div>

          {/* Link columns */}
          <div className="flex gap-12 sm:gap-16">
            {FOOTER_DATA.columns.map((col) => (
              <div key={col.heading}>
                <p className={`text-[11px] font-semibold uppercase tracking-widest mb-3 ${muted}`}>
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={`text-sm transition-colors ${dark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social + toggle */}
          <div className="flex flex-col justify-between gap-6">
            <div className="flex items-center gap-3">
              {FOOTER_DATA.social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`transition-colors ${dark ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-gray-900"}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className={`self-start p-2 rounded-lg transition-colors ${dark ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="h-px mt-10 mb-6" style={{ backgroundColor: divider }} />
        <span className={`text-xs ${muted}`}>{FOOTER_DATA.copyright}</span>
      </footer>
    </div>
  )
}
