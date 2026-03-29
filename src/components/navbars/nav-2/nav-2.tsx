import { useState, useRef, useEffect } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_DATA = {
  brand: { name: "Lendflow", logo: "account_balance" },
  links: [
    {
      label: "Solutions",
      hasMenu: true,
      menu: {
        left: {
          gradient: "linear-gradient(135deg, #4F46E5 0%, #6366F1 40%, #818CF8 75%, #A5B4FC 100%)",
          tags: [
            "Working Capital",
            "Line of Credit",
            "Merchant Cash Advances",
            "Installment Loans",
            "Buy Now Pay Later",
            "Invoice Financing",
          ],
          heading: "Use Cases",
          description: "Purpose-built for commercial lenders.",
          cta: "Explore all solutions",
        },
        right: {
          heading: "BY TEAM",
          items: [
            { label: "Lending Program Directors", icon: "account_balance", desc: "Oversee end-to-end lending operations" },
            { label: "Credit Risk Teams", icon: "security", desc: "Automate decisioning and risk scoring" },
            { label: "Customer Support Teams", icon: "support_agent", desc: "Resolve borrower issues faster" },
            { label: "Data & Business Intelligence", icon: "bar_chart", desc: "Real-time portfolio analytics" },
            { label: "Accounting & Finance Teams", icon: "calculate", desc: "Reconciliation and reporting" },
          ],
        },
      },
    },
    {
      label: "Developers",
      hasMenu: true,
      menu: {
        left: {
          gradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)",
          tags: ["REST API", "Webhooks", "SDKs", "GraphQL", "Sandbox"],
          heading: "Developer Hub",
          description: "Everything you need to integrate Lendflow.",
          cta: "View documentation",
        },
        right: {
          heading: "RESOURCES",
          items: [
            { label: "API Reference", icon: "code", desc: "Full endpoint documentation" },
            { label: "Quickstart Guide", icon: "rocket_launch", desc: "Up and running in minutes" },
            { label: "Changelog", icon: "history", desc: "Latest updates and releases" },
            { label: "Status Page", icon: "monitor_heart", desc: "Real-time system status" },
            { label: "Community Forum", icon: "forum", desc: "Ask questions, share ideas" },
          ],
        },
      },
    },
    {
      label: "Resources",
      hasMenu: true,
      menu: {
        left: {
          gradient: "linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)",
          tags: ["Blog", "Case Studies", "Webinars", "Whitepapers", "Guides"],
          heading: "Learn",
          description: "Insights for modern lending teams.",
          cta: "Browse all resources",
        },
        right: {
          heading: "POPULAR",
          items: [
            { label: "2024 Lending Report", icon: "description", desc: "Industry benchmarks and trends" },
            { label: "Risk Scoring 101", icon: "school", desc: "A beginner's guide to credit risk" },
            { label: "Embedded Finance", icon: "payments", desc: "How to embed lending in your product" },
            { label: "Compliance Checklist", icon: "checklist", desc: "Stay audit-ready" },
            { label: "ROI Calculator", icon: "calculate", desc: "Estimate your savings" },
          ],
        },
      },
    },
    { label: "Customers", hasMenu: false },
    { label: "Pricing", hasMenu: false },
  ],
  cta: { demo: "Book a demo", login: "Sign in" },
}
// ─────────────────────────────────────────────────────────────────────────────

type MenuItem = typeof NAV_DATA.links[0] & { menu?: typeof NAV_DATA.links[0]["menu"] }

const Navbar_2 = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
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

  const activeLink = NAV_DATA.links.find(l => l.label === openMenu) as MenuItem | undefined
  const activeMenu = activeLink?.menu

  // Theme
  const bg = dark ? "bg-[#0A0A0A]" : "bg-white"
  const border = dark ? "border-white/8" : "border-gray-100"
  const text = dark ? "text-gray-100" : "text-gray-900"
  const muted = dark ? "text-gray-400" : "text-gray-500"
  const menuBg = dark ? "bg-[#111111]" : "bg-white"
  const hoverRow = dark ? "hover:bg-white/5" : "hover:bg-gray-50"
  const cardBg = dark ? "bg-[#1A1A1A]" : "bg-gray-50"

  return (
    <div className={`h-full w-full ${bg} flex flex-col transition-colors duration-300`}>

      <div ref={navRef} className="relative shrink-0">
        {/* ── Navbar ──────────────────────────────────────────────── */}
        <nav className={`flex items-center h-14 px-8 border-b ${border} gap-2 transition-colors duration-300`}>

          {/* Logo */}
          <div className="flex items-center gap-2 mr-6 shrink-0">
            <span className="material-icons text-indigo-500 text-[20px]">{NAV_DATA.brand.logo}</span>
            <span className={`text-sm font-bold tracking-tight ${text}`}>{NAV_DATA.brand.name}</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1 flex-1">
            {NAV_DATA.links.map(link => (
              <button
                key={link.label}
                onClick={() => link.hasMenu
                  ? setOpenMenu(o => o === link.label ? null : link.label)
                  : setOpenMenu(null)
                }
                className={`flex items-center gap-0.5 text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                  openMenu === link.label
                    ? `${text} ${dark ? "bg-white/8" : "bg-gray-100"}`
                    : `${muted} ${hoverRow}`
                }`}
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
            <button
              onClick={() => setDark(d => !d)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${dark ? "bg-white/10 text-gray-300 hover:bg-white/15" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <span className="material-icons text-[16px]">{dark ? "light_mode" : "dark_mode"}</span>
            </button>
            <button className={`hidden md:block text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${muted} ${hoverRow}`}>
              {NAV_DATA.cta.login}
            </button>
            <button className="hidden md:block text-sm font-semibold px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              {NAV_DATA.cta.demo}
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
        {openMenu && activeMenu && (
          <div className={`absolute top-full left-0 right-0 z-50 ${menuBg} border-b ${border} shadow-2xl transition-colors duration-300`}>
            <div className="flex px-8 py-8 gap-8 max-w-5xl">

              {/* Left — gradient card */}
              <div
                className="w-[320px] shrink-0 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
                style={{ background: activeMenu.left.gradient }}
              >
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
                  <span className="material-icons text-white text-[15px]">north_east</span>
                </button>

                <div className="flex flex-wrap gap-2 mt-2">
                  {activeMenu.left.tags.map(tag => (
                    <span key={tag} className="text-xs text-white/90 bg-white/15 hover:bg-white/25 rounded-full px-3 py-1.5 font-medium cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-white text-xl font-bold mb-1.5">{activeMenu.left.heading}</h3>
                  <p className="text-white/65 text-sm mb-4">{activeMenu.left.description}</p>
                  <button className="flex items-center gap-1.5 text-white text-sm font-semibold group">
                    {activeMenu.left.cta}
                    <span className="material-icons text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Right — team/resource list */}
              <div className="flex flex-col gap-5 flex-1 justify-center">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-gray-500" : "text-gray-400"}`}>
                  {activeMenu.right.heading}
                </span>
                <div className="flex flex-col gap-0.5">
                  {activeMenu.right.items.map(item => (
                    <button
                      key={item.label}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-colors group ${hoverRow}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-indigo-500/15" : "bg-indigo-50"}`}>
                        <span className="material-icons text-[18px] text-indigo-500">{item.icon}</span>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${text}`}>{item.label}</p>
                        <p className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{item.desc}</p>
                      </div>
                      <span className={`material-icons text-[16px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${muted}`}>
                        arrow_forward
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "flex-1" : "max-h-0"}`}>
        <div className={`h-full overflow-y-auto ${bg} px-6 py-4 flex flex-col gap-1 border-t ${border}`}>
          {NAV_DATA.links.map(link => (
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
                <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === link.label ? "max-h-[400px]" : "max-h-0"}`}>
                  <div className="pl-3 py-3 flex flex-col gap-1">
                    {link.menu.right.items.map(item => (
                      <button key={item.label} className={`flex items-center gap-3 py-2 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                        <span className="material-icons text-[16px] text-indigo-400">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-5">
            <button className={`flex-1 py-2.5 text-sm font-medium border ${border} rounded-lg ${text}`}>
              {NAV_DATA.cta.login}
            </button>
            <button className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-indigo-600 text-white">
              {NAV_DATA.cta.demo}
            </button>
          </div>
        </div>
      </div>

      {/* ── Page content ────────────────────────────────────────────── */}
      <div className={`flex-1 ${cardBg} flex items-center justify-center overflow-hidden relative transition-colors duration-300`}>
        <span
          className="absolute font-black select-none leading-none tracking-tight"
          style={{
            fontSize: "clamp(3rem, 12cqw, 10rem)",
            color: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
          }}
        >
          lending platform.
        </span>
      </div>
    </div>
  )
}

export default Navbar_2
