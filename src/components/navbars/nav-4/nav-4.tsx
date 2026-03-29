import { useState, useRef, useEffect } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_DATA = {
  brand: { prefix: "dot", suffix: "CMS", color: "#7C3AED" },
  links: [
    {
      label: "Product",
      hasMenu: true,
      menu: {
        type: "simple" as const,
        columns: [
          {
            heading: "Platform",
            items: [
              { icon: "layers", label: "Headless CMS", desc: "API-first content platform" },
              { icon: "article", label: "Content Studio", desc: "Visual editing experience" },
              { icon: "account_tree", label: "Workflows", desc: "Approval and publishing flows" },
              { icon: "extension", label: "Integrations", desc: "Connect your stack" },
            ],
          },
          {
            heading: "Infrastructure",
            items: [
              { icon: "cloud", label: "Cloud Hosting", desc: "Managed, scalable hosting" },
              { icon: "security", label: "Security", desc: "SOC 2 Type II certified" },
              { icon: "speed", label: "Performance", desc: "Edge-optimized delivery" },
              { icon: "code", label: "API Playground", desc: "Test and explore APIs" },
            ],
          },
        ],
      },
    },
    {
      label: "Solutions",
      hasMenu: true,
      menu: {
        type: "persona" as const,
        personas: [
          {
            title: "Developer",
            description: "Empowering flexibility and efficiency",
            icon: "code",
            color: "#7C3AED",
          },
          {
            title: "Marketer",
            description: "Built for agility and collaboration",
            icon: "campaign",
            color: "#7C3AED",
          },
          {
            title: "DevOps Engineer",
            description: "Designed for the enterprise",
            icon: "terminal",
            color: "#7C3AED",
          },
        ],
        features: [
          { icon: "layers", label: "Headless Content Management", highlight: false },
          { icon: "article", label: "Structured Content", highlight: true },
          { icon: "account_tree", label: "Workflows & Approval", highlight: false },
          { icon: "extension", label: "Interoperability & Extensibility", highlight: false },
          { icon: "code", label: "Api Playground", highlight: false },
        ],
        editorial: {
          heading: "Customized workflows for content governance",
          body: "Today's digital campaigns are complex and require coordination of multiple touchpoints along the customer journey.",
        },
      },
    },
    {
      label: "Partners",
      hasMenu: true,
      menu: {
        type: "simple" as const,
        columns: [
          {
            heading: "Partner types",
            items: [
              { icon: "handshake", label: "Technology Partners", desc: "Integrate with dotCMS" },
              { icon: "school", label: "Training Partners", desc: "Certified training providers" },
              { icon: "store", label: "Resellers", desc: "Sell and implement dotCMS" },
              { icon: "diversity_3", label: "Agency Partners", desc: "Build on dotCMS" },
            ],
          },
          {
            heading: "Programs",
            items: [
              { icon: "star", label: "Partner Portal", desc: "Access partner resources" },
              { icon: "add_circle", label: "Become a Partner", desc: "Join the ecosystem" },
              { icon: "emoji_events", label: "Partner Awards", desc: "Recognizing excellence" },
            ],
          },
        ],
      },
    },
    {
      label: "Resources",
      hasMenu: true,
      menu: {
        type: "simple" as const,
        columns: [
          {
            heading: "Learn",
            items: [
              { icon: "menu_book", label: "Documentation", desc: "Guides and references" },
              { icon: "article", label: "Blog", desc: "Insights and updates" },
              { icon: "videocam", label: "Webinars", desc: "Live and on-demand" },
              { icon: "school", label: "Academy", desc: "Free training courses" },
            ],
          },
          {
            heading: "Company",
            items: [
              { icon: "info", label: "About dotCMS", desc: "Our story and mission" },
              { icon: "work", label: "Careers", desc: "Join our team" },
              { icon: "newspaper", label: "Press", desc: "News and media" },
              { icon: "mail", label: "Contact", desc: "Get in touch" },
            ],
          },
        ],
      },
    },
    { label: "Pricing", hasMenu: false },
  ],
  cta: "Request a demo",
}
// ─────────────────────────────────────────────────────────────────────────────

type SimpleMenu = {
  type: "simple"
  columns: { heading: string; items: { icon: string; label: string; desc: string }[] }[]
}
type PersonaMenu = {
  type: "persona"
  personas: { title: string; description: string; icon: string; color: string }[]
  features: { icon: string; label: string; highlight: boolean }[]
  editorial: { heading: string; body: string }
}
type NavLink = { label: string; hasMenu: boolean; menu?: SimpleMenu | PersonaMenu }

const Navbar_4 = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [activePersona, setActivePersona] = useState(0)
  const [dark, setDark] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const activeLink = (NAV_DATA.links as NavLink[]).find(l => l.label === openMenu)

  // Theme
  const bg = dark ? "bg-[#0A0A0A]" : "bg-white"
  const border = dark ? "border-white/8" : "border-gray-100"
  const text = dark ? "text-gray-100" : "text-gray-900"
  const muted = dark ? "text-gray-400" : "text-gray-500"
  const menuBg = dark ? "bg-[#111111]" : "bg-white"
  const hoverRow = dark ? "hover:bg-white/5" : "hover:bg-gray-50"
  const panelBg = dark ? "bg-[#161616]" : "bg-gray-50/60"
  const highlightBg = dark ? "bg-white/5" : "bg-gray-50"

  const BRAND_COLOR = NAV_DATA.brand.color

  return (
    <div className={`h-full w-full ${bg} flex flex-col transition-colors duration-300`}>

      <div ref={navRef} className="relative shrink-0">
        {/* ── Navbar ──────────────────────────────────────────────── */}
        <nav className={`flex items-center h-14 px-6 border-b ${border} gap-4 transition-colors duration-300`}>

          {/* Logo */}
          <div className="flex items-center shrink-0 mr-4">
            <span className={`text-lg font-bold ${text}`}>{NAV_DATA.brand.prefix}</span>
            <span className="text-lg font-bold" style={{ color: BRAND_COLOR }}>{NAV_DATA.brand.suffix}</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-0.5 flex-1">
            {(NAV_DATA.links as NavLink[]).map(link => (
              <button
                key={link.label}
                onClick={() => link.hasMenu
                  ? setOpenMenu(o => o === link.label ? null : link.label)
                  : setOpenMenu(null)
                }
                className={`flex items-center gap-0.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                  openMenu === link.label
                    ? `font-semibold`
                    : `${muted} ${hoverRow}`
                }`}
                style={openMenu === link.label ? { color: BRAND_COLOR } : {}}
              >
                {link.label}
                {link.hasMenu && (
                  <span className="material-icons text-[14px] transition-transform duration-200"
                    style={{ transform: openMenu === link.label ? "rotate(180deg)" : "rotate(0deg)" }}>
                    keyboard_arrow_down
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <button className={`text-gray-400 hover:${text.replace("text-", "text-")} transition-colors`}>
              <span className="material-icons text-[20px]">search</span>
            </button>
            <button
              onClick={() => setDark(d => !d)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${dark ? "bg-white/10 text-gray-300 hover:bg-white/15" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <span className="material-icons text-[16px]">{dark ? "light_mode" : "dark_mode"}</span>
            </button>
            <button
              className="hidden md:block text-sm font-semibold px-4 py-2 rounded-lg border-2 transition-colors"
              style={{ borderColor: BRAND_COLOR, color: BRAND_COLOR }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = dark ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.06)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent" }}
            >
              {NAV_DATA.cta}
            </button>
            <button
              className={`md:hidden ${muted}`}
              onClick={() => { setMobileOpen(o => !o); setOpenMenu(null) }}
            >
              <span className="material-icons">{mobileOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </nav>

        {/* ── Mega menu ─────────────────────────────────────────── */}
        {openMenu && activeLink?.menu && (
          <div className={`absolute top-full left-0 right-0 z-50 ${menuBg} border-b ${border} shadow-2xl transition-colors duration-300`}>

            {/* ── Persona menu (Solutions) ── */}
            {activeLink.menu.type === "persona" && (
              <div className="flex mx-6 my-5 rounded-2xl border overflow-hidden" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#F3F4F6" }}>

                {/* Col 1 — Personas */}
                <div className={`w-[240px] shrink-0 p-4 flex flex-col gap-2 border-r ${border} ${panelBg}`}>
                  {activeLink.menu.personas.map((p, pi) => (
                    <button
                      key={p.title}
                      onMouseEnter={() => setActivePersona(pi)}
                      onClick={() => setActivePersona(pi)}
                      className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between group border ${
                        activePersona === pi
                          ? `border-purple-200 ${dark ? "bg-purple-500/10" : "bg-purple-50"}`
                          : `border-transparent ${hoverRow}`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePersona === pi ? "bg-purple-100" : dark ? "bg-white/8" : "bg-gray-100"}`}>
                          <span className="material-icons text-[16px]" style={{ color: activePersona === pi ? BRAND_COLOR : dark ? "#9CA3AF" : "#6B7280" }}>
                            {p.icon}
                          </span>
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${activePersona === pi ? "" : text}`}
                            style={activePersona === pi ? { color: BRAND_COLOR } : {}}>
                            {p.title}
                          </p>
                          <p className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{p.description}</p>
                        </div>
                      </div>
                      <span className="material-icons text-[15px] shrink-0"
                        style={{ color: activePersona === pi ? BRAND_COLOR : dark ? "#374151" : "#D1D5DB" }}>
                        arrow_forward_ios
                      </span>
                    </button>
                  ))}
                </div>

                {/* Col 2 — Features */}
                <div className={`flex-1 p-4 flex flex-col gap-0.5 border-r ${border}`}>
                  {activeLink.menu.features.map(f => (
                    <button
                      key={f.label}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-colors group ${
                        f.highlight ? highlightBg : hoverRow
                      }`}
                    >
                      <span className={`material-icons text-[20px] ${dark ? "text-gray-500" : "text-gray-400"} group-hover:text-purple-500 transition-colors`}>
                        {f.icon}
                      </span>
                      <span className={`font-medium ${text}`}>{f.label}</span>
                    </button>
                  ))}
                  <button className={`mt-2 ml-auto w-9 h-9 rounded-full border ${border} flex items-center justify-center ${hoverRow} transition-colors`}>
                    <span className={`material-icons text-[16px] ${muted}`}>north_east</span>
                  </button>
                </div>

                {/* Col 3 — Editorial */}
                <div className="w-[240px] shrink-0 p-6 flex flex-col justify-center gap-4">
                  <h3 className={`text-base font-bold leading-snug ${text}`}>
                    {activeLink.menu.editorial.heading}
                  </h3>
                  <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {activeLink.menu.editorial.body}
                  </p>
                  <button className="flex items-center gap-1.5 text-sm font-semibold group" style={{ color: BRAND_COLOR }}>
                    Learn more
                    <span className="material-icons text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── Simple two-column menu ── */}
            {activeLink.menu.type === "simple" && (
              <div className="flex px-8 py-7 gap-12">
                {activeLink.menu.columns.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-1 min-w-[200px]">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                      {col.heading}
                    </span>
                    {col.items.map(item => (
                      <button
                        key={item.label}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${hoverRow}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${dark ? "bg-white/8" : "bg-gray-100"} group-hover:bg-purple-50 transition-colors`}>
                          <span className={`material-icons text-[16px] ${dark ? "text-gray-400" : "text-gray-500"} group-hover:text-purple-500 transition-colors`}>
                            {item.icon}
                          </span>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${text}`}>{item.label}</p>
                          <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "flex-1" : "max-h-0"}`}>
        <div className={`h-full overflow-y-auto ${bg} px-6 py-4 flex flex-col gap-1 border-t ${border}`}>
          {(NAV_DATA.links as NavLink[]).map(link => (
            <div key={link.label}>
              <button
                onClick={() => setMobileExpanded(e => e === link.label ? null : link.label)}
                className={`flex items-center justify-between w-full py-3 text-sm font-medium border-b ${border} ${text}`}
              >
                {link.label}
                {link.hasMenu && (
                  <span className="material-icons text-[16px]">
                    {mobileExpanded === link.label ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                  </span>
                )}
              </button>
              {link.hasMenu && link.menu && (
                <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === link.label ? "max-h-[600px]" : "max-h-0"}`}>
                  <div className="pl-3 py-3 flex flex-col gap-1">
                    {link.menu.type === "persona" && link.menu.personas.map(p => (
                      <button key={p.title} className={`flex items-center gap-3 py-2 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                        <span className="material-icons text-[16px]" style={{ color: BRAND_COLOR }}>{p.icon}</span>
                        {p.title}
                      </button>
                    ))}
                    {link.menu.type === "simple" && link.menu.columns.flatMap(c => c.items).map(item => (
                      <button key={item.label} className={`flex items-center gap-3 py-2 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                        <span className={`material-icons text-[16px] ${dark ? "text-gray-500" : "text-gray-400"}`}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="pt-5">
            <button
              className="w-full py-2.5 text-sm font-semibold rounded-lg border-2 transition-colors"
              style={{ borderColor: BRAND_COLOR, color: BRAND_COLOR }}
            >
              {NAV_DATA.cta}
            </button>
          </div>
        </div>
      </div>

      {/* ── Page content ────────────────────────────────────────────── */}
      <div className={`flex-1 ${dark ? "bg-[#0A0A0A]" : "bg-gray-50"} flex items-center justify-center transition-colors duration-300`}>
        <span className={`text-sm ${dark ? "text-gray-700" : "text-gray-300"}`}>Page content</span>
      </div>
    </div>
  )
}

export default Navbar_4
