import { useState } from "react"
import { X, Code2, Globe, AtSign, Sun, Moon } from "lucide-react"

const FOOTER_DATA = {
  brand: {
    name: "Horizon",
    tagline: "Crafting digital experiences that inspire and endure.",
    description: "We partner with ambitious teams to design and build products people love.",
  },
  social: [
    { icon: X, label: "Twitter", href: "#" },
    { icon: Code2, label: "GitHub", href: "#" },
    { icon: Globe, label: "LinkedIn", href: "#" },
    { icon: AtSign, label: "Instagram", href: "#" },
  ],
  columns: [
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      heading: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Integrations", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Roadmap", href: "#" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Community", href: "#" },
        { label: "Status", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ],
  copyright: "© 2024 Horizon Labs, Inc.",
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
}

export default function Footer_3() {
  const [dark, setDark] = useState(false)

  const bg = dark ? "bg-[#111]" : "bg-white"
  const text = dark ? "text-white" : "text-gray-900"
  const muted = dark ? "text-gray-400" : "text-gray-500"
  const subtle = dark ? "text-gray-600" : "text-gray-400"
  const divider = dark ? "#1f1f1f" : "#e5e7eb"

  return (
    <div className={`h-full w-full ${bg} ${text}`}>
      <footer className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left half — brand + social */}
          <div className="lg:w-2/5 flex flex-col justify-between gap-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold tracking-tight">{FOOTER_DATA.brand.name}</span>
                <button
                  onClick={() => setDark(!dark)}
                  aria-label="Toggle dark mode"
                  className={`p-2 rounded-lg transition-colors ${dark ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
              <p className={`text-xl font-medium leading-snug mb-3 ${text}`}>
                {FOOTER_DATA.brand.tagline}
              </p>
              <p className={`text-sm leading-relaxed ${muted}`}>
                {FOOTER_DATA.brand.description}
              </p>
            </div>

            {/* Social */}
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${subtle}`}>Follow us</p>
              <div className="flex items-center gap-3">
                {FOOTER_DATA.social.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${dark ? "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900"}`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical divider (desktop) */}
          <div className="hidden lg:block w-px self-stretch" style={{ backgroundColor: divider }} />

          {/* Right half — link columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {FOOTER_DATA.columns.map((col) => (
              <div key={col.heading}>
                <p className={`text-[11px] font-semibold uppercase tracking-widest mb-5 ${subtle}`}>
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3">
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
        </div>

        {/* Bottom bar */}
        <div className="h-px mt-14 mb-8" style={{ backgroundColor: divider }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className={`text-xs ${subtle}`}>{FOOTER_DATA.copyright}</span>
          <div className="flex items-center gap-5">
            {FOOTER_DATA.legal.map((item) => (
              <a key={item.label} href={item.href} className={`text-xs transition-colors ${dark ? "text-gray-600 hover:text-gray-300" : "text-gray-400 hover:text-gray-700"}`}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
