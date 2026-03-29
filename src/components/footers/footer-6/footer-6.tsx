import { useState } from "react"
import { X, Code2, Globe, AtSign, Video, Sun, Moon } from "lucide-react"

const FOOTER_DATA = {
  brand: {
    name: "Prism",
    tagline: "Design. Build. Ship.",
    description: "The all-in-one creative platform for modern product teams.",
  },
  links: [
    { label: "Product", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Docs", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  social: [
    { icon: X, label: "Twitter", href: "#" },
    { icon: Code2, label: "GitHub", href: "#" },
    { icon: Globe, label: "LinkedIn", href: "#" },
    { icon: AtSign, label: "Instagram", href: "#" },
    { icon: Video, label: "YouTube", href: "#" },
  ],
  newsletter: {
    heading: "Get early access",
    placeholder: "Enter your email",
    cta: "Join waitlist",
  },
  copyright: "© 2024 Prism Inc.",
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
}

export default function Footer_6() {
  const [dark, setDark] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <div className="h-full w-full">
      <footer
        className="relative overflow-hidden"
        style={{
          background: dark
            ? "linear-gradient(135deg, #1a0533 0%, #0d1a3a 50%, #0a1628 100%)"
            : "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: dark ? "#7c3aed" : "#a78bfa" }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ background: dark ? "#2563eb" : "#93c5fd" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-10">
          {/* Top section */}
          <div className="flex flex-col lg:flex-row gap-12 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">{FOOTER_DATA.brand.name}</h2>
                  <p className="text-white/60 text-sm font-medium mt-0.5">{FOOTER_DATA.brand.tagline}</p>
                </div>
                <button
                  onClick={() => setDark(!dark)}
                  aria-label="Toggle dark mode"
                  className="p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                {FOOTER_DATA.brand.description}
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-8">
                {FOOTER_DATA.social.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:w-80">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-2">Newsletter</p>
              <h3 className="text-xl font-bold text-white mb-4">{FOOTER_DATA.newsletter.heading}</h3>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={FOOTER_DATA.newsletter.placeholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm outline-none focus:border-white/40 transition-colors"
                />
                <button className="w-full py-3 rounded-xl bg-white text-purple-700 font-semibold text-sm hover:bg-white/90 transition-colors">
                  {FOOTER_DATA.newsletter.cta}
                </button>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 py-10 border-b border-white/10">
            {FOOTER_DATA.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
            <span className="text-xs text-white/40">{FOOTER_DATA.copyright}</span>
            <div className="flex items-center gap-5">
              {FOOTER_DATA.legal.map((item) => (
                <a key={item.label} href={item.href} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
