import { useState } from "react"
import { X, Code2, Globe, AtSign, Sun, Moon } from "lucide-react"

const FOOTER_DATA = {
  brand: {
    name: "Acme",
    description: "Building the future of developer tooling, one component at a time.",
  },
  columns: [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Roadmap", href: "#" },
        { label: "Beta", href: "#" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Partners", href: "#" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Examples", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Licenses", href: "#" },
      ],
    },
  ],
  social: [
    { icon: X, label: "Twitter", href: "#" },
    { icon: Code2, label: "GitHub", href: "#" },
    { icon: Globe, label: "LinkedIn", href: "#" },
    { icon: AtSign, label: "Instagram", href: "#" },
  ],
  copyright: "© 2024 Acme, Inc. All rights reserved.",
}

export default function Footer_1() {
  const [dark, setDark] = useState(false)

  return (
    <div className={`h-full w-full ${dark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}>
      <footer className="max-w-6xl mx-auto px-6 py-16">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-gray-200 dark:border-gray-800"
          style={{ borderColor: dark ? "#1f1f1f" : "#e5e7eb" }}>
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <span className="text-lg font-semibold tracking-tight">{FOOTER_DATA.brand.name}</span>
            <p className={`text-[13px] leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
              {FOOTER_DATA.brand.description}
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_DATA.columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <span className={`text-[11px] font-semibold uppercase tracking-widest ${dark ? "text-gray-500" : "text-gray-400"}`}>
                {col.heading}
              </span>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-[13px] transition-colors ${dark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: copyright + social + toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <span className={`text-[12px] ${dark ? "text-gray-500" : "text-gray-400"}`}>
            {FOOTER_DATA.copyright}
          </span>

          <div className="flex items-center gap-4">
            {FOOTER_DATA.social.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`transition-colors ${dark ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-gray-900"}`}
              >
                <Icon size={16} />
              </a>
            ))}

            <div className={`w-px h-4 ${dark ? "bg-gray-700" : "bg-gray-200"}`} />

            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className={`p-1.5 rounded-md transition-colors ${dark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
