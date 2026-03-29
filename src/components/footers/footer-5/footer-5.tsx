import { useState } from "react"
import { X, Code2, Globe, AtSign, Video, Sun, Moon } from "lucide-react"

const FOOTER_DATA = {
  brand: {
    name: "Nexus",
    description: "The platform for modern teams to ship faster.",
    badge: "v3.0 now live →",
  },
  newsletter: {
    placeholder: "your@email.com",
    cta: "Get updates",
  },
  columns: [
    {
      heading: "Platform",
      links: [
        { label: "Overview", href: "#" },
        { label: "Analytics", href: "#" },
        { label: "Automation", href: "#" },
        { label: "Integrations", href: "#" },
        { label: "API", href: "#" },
        { label: "CLI", href: "#" },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Startups", href: "#" },
        { label: "Enterprise", href: "#" },
        { label: "Agencies", href: "#" },
        { label: "Freelancers", href: "#" },
        { label: "Open Source", href: "#" },
        { label: "Education", href: "#" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Community", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Partners", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Investors", href: "#" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "Licenses", href: "#" },
        { label: "GDPR", href: "#" },
      ],
    },
  ],
  social: [
    { icon: X, label: "Twitter", href: "#" },
    { icon: Code2, label: "GitHub", href: "#" },
    { icon: Globe, label: "LinkedIn", href: "#" },
    { icon: AtSign, label: "Instagram", href: "#" },
    { icon: Video, label: "YouTube", href: "#" },
  ],
  copyright: "© 2024 Nexus Technologies, Inc. All rights reserved.",
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Settings", href: "#" },
  ],
}

export default function Footer_5() {
  const [dark, setDark] = useState(false)
  const [email, setEmail] = useState("")

  const bg = dark ? "bg-[#0c0c0c]" : "bg-gray-50"
  const card = dark ? "bg-[#141414] border-[#1e1e1e]" : "bg-white border-gray-200"
  const text = dark ? "text-white" : "text-gray-900"
  const muted = dark ? "text-gray-400" : "text-gray-500"
  const subtle = dark ? "text-gray-600" : "text-gray-400"
  const divider = dark ? "#1e1e1e" : "#e5e7eb"
  const inputBg = dark ? "bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder-gray-600" : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400"

  return (
    <div className={`h-full w-full ${bg} ${text}`}>
      <footer className="max-w-7xl mx-auto px-6 py-14">
        {/* Top bar: brand + newsletter */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-xl border mb-10 ${card}`}>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg font-bold">{FOOTER_DATA.brand.name}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${dark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
                {FOOTER_DATA.brand.badge}
              </span>
            </div>
            <p className={`text-sm ${muted}`}>{FOOTER_DATA.brand.description}</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={FOOTER_DATA.newsletter.placeholder}
              className={`text-sm px-3 py-2 rounded-lg border outline-none w-full md:w-52 ${inputBg}`}
            />
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-gray-900 transition-colors shrink-0"
              style={{ background: dark ? "white" : "#111", color: dark ? "#111" : "white" }}>
              {FOOTER_DATA.newsletter.cta}
            </button>
          </div>
        </div>

        {/* 5-column link grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 pb-10 border-b" style={{ borderColor: divider }}>
          {FOOTER_DATA.columns.map((col) => (
            <div key={col.heading}>
              <p className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${subtle}`}>
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-[13px] transition-colors ${dark ? "text-gray-500 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className={`text-[12px] ${subtle}`}>{FOOTER_DATA.copyright}</span>
            <div className="flex items-center gap-4">
              {FOOTER_DATA.legal.map((item) => (
                <a key={item.label} href={item.href} className={`text-[12px] transition-colors ${dark ? "text-gray-600 hover:text-gray-300" : "text-gray-400 hover:text-gray-700"}`}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {FOOTER_DATA.social.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className={`transition-colors ${dark ? "text-gray-600 hover:text-white" : "text-gray-400 hover:text-gray-900"}`}>
                <Icon size={16} />
              </a>
            ))}
            <div className="w-px h-4" style={{ backgroundColor: divider }} />
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className={`p-1.5 rounded-md transition-colors ${dark ? "text-gray-500 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-900 hover:bg-gray-200"}`}
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
