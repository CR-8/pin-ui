import { useState, useRef, useEffect } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_DATA = {
  brand: { name: "Ramp", icon: "bolt" },
  links: [
    {
      label: "Products",
      hasMenu: true,
      menu: {
        columns: [
          {
            heading: "By product",
            items: [
              { label: "Corporate cards", icon: "credit_card", desc: "Physical and virtual cards" },
              { label: "Expense management", icon: "receipt_long", desc: "Automate expense reports" },
              { label: "Bill payments", icon: "payments", desc: "Pay vendors on time" },
              { label: "Accounting", icon: "calculate", desc: "Close the books faster" },
              { label: "Procurement", icon: "shopping_cart", desc: "Streamline purchasing" },
            ],
          },
          {
            heading: "By industry",
            items: [
              { label: "Startups", icon: "rocket_launch", desc: "Move fast, spend smart" },
              { label: "Small business", icon: "store", desc: "Simple tools, big impact" },
              { label: "Mid-market", icon: "business", desc: "Scale with confidence" },
              { label: "Enterprise", icon: "domain", desc: "Enterprise-grade controls" },
              { label: "Healthcare", icon: "local_hospital", desc: "HIPAA-ready finance" },
            ],
          },
        ],
        featured: {
          img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&q=80",
          tag: "NEW",
          title: "Ramp announces Series D-2 capital raise",
          description: "Ramp is completing a $150 million funding round, led by Khosla Ventures and Founders Fund.",
        },
      },
    },
    {
      label: "Solutions",
      hasMenu: true,
      menu: {
        columns: [
          {
            heading: "By size",
            items: [
              { label: "Startups", icon: "rocket_launch", desc: "Built for speed" },
              { label: "Small business", icon: "store", desc: "Grow without friction" },
              { label: "Mid-market", icon: "business", desc: "Operational excellence" },
              { label: "Enterprise", icon: "domain", desc: "Global scale" },
            ],
          },
          {
            heading: "By partner",
            items: [
              { label: "Accounting firms", icon: "account_balance", desc: "White-label solutions" },
              { label: "Affiliate partners", icon: "handshake", desc: "Earn with Ramp" },
              { label: "Alliance partners", icon: "diversity_3", desc: "Strategic integrations" },
              { label: "Financial institutions", icon: "corporate_fare", desc: "Bank partnerships" },
              { label: "Become a partner", icon: "add_circle", desc: "Join the ecosystem" },
            ],
          },
        ],
        featured: {
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
          tag: "GUIDE",
          title: "The complete guide to spend management",
          description: "Learn how leading finance teams are cutting costs and closing books faster.",
        },
      },
    },
    { label: "Customers", hasMenu: false },
    {
      label: "Resources",
      hasMenu: true,
      menu: {
        columns: [
          {
            heading: "Learn",
            items: [
              { label: "Blog", icon: "article", desc: "Finance insights and tips" },
              { label: "Case studies", icon: "star", desc: "Real customer stories" },
              { label: "Webinars", icon: "videocam", desc: "Live and on-demand" },
              { label: "Documentation", icon: "menu_book", desc: "Guides and references" },
            ],
          },
          {
            heading: "Company",
            items: [
              { label: "About", icon: "info", desc: "Our mission and team" },
              { label: "Careers", icon: "work", desc: "Join the team" },
              { label: "Press", icon: "newspaper", desc: "News and media" },
              { label: "Contact", icon: "mail", desc: "Get in touch" },
            ],
          },
        ],
        featured: {
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
          tag: "REPORT",
          title: "2024 State of Finance Report",
          description: "How finance teams are adapting to economic uncertainty and new technology.",
        },
      },
    },
    { label: "Pricing", hasMenu: false },
  ],
  cta: { login: "Log in", signup: "Get started" },
  // Active pill accent color
  accent: "#C8F135",
}
// ─────────────────────────────────────────────────────────────────────────────

type ColItem = { label: string; icon: string; desc: string }
type MenuCol = { heading: string; items: ColItem[] }
type MenuData = { columns: MenuCol[]; featured: { img: string; tag: string; title: string; description: string } }
type NavLink = { label: string; hasMenu: boolean; menu?: MenuData }

const Navbar_3 = () => {
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

  const activeLink = (NAV_DATA.links as NavLink[]).find(l => l.label === openMenu)

  // Theme
  const bg = dark ? "bg-[#0C0C0C]" : "bg-[#F0F0EC]"
  const navBg = dark ? "bg-[#0C0C0C]" : "bg-[#F0F0EC]"
  const menuBg = dark ? "bg-[#141414]" : "bg-white"
  const border = dark ? "border-white/8" : "border-gray-200"
  const text = dark ? "text-gray-100" : "text-gray-900"
  const muted = dark ? "text-gray-400" : "text-gray-500"
  const hoverRow = dark ? "hover:bg-white/5" : "hover:bg-gray-50"
  const pillHover = dark ? "hover:bg-white/8" : "hover:bg-black/6"

  return (
    <div className={`h-full w-full ${bg} flex flex-col transition-colors duration-300`}>

      <div ref={navRef} className="relative shrink-0">
        {/* ── Navbar ──────────────────────────────────────────────── */}
        <nav className={`${navBg} flex items-center h-14 px-6 transition-colors duration-300`}>

          {/* Logo — left */}
          <div className="flex items-center gap-1.5 mr-6 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="material-icons text-white text-[16px]">{NAV_DATA.brand.icon}</span>
            </div>
            <span className={`text-sm font-bold ${text}`}>{NAV_DATA.brand.name}</span>
          </div>

          {/* Center — pill links */}
          <div className="flex items-center gap-1 flex-1 justify-center">
            {(NAV_DATA.links as NavLink[]).map(link => {
              const isActive = openMenu === link.label
              return (
                <button
                  key={link.label}
                  onClick={() => link.hasMenu
                    ? setOpenMenu(o => o === link.label ? null : link.label)
                    : setOpenMenu(null)
                  }
                  className={`flex items-center gap-0.5 text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive ? `text-gray-900` : `${muted} ${pillHover}`
                  }`}
                  style={isActive ? { backgroundColor: NAV_DATA.accent } : {}}
                >
                  {link.label}
                  {link.hasMenu && (
                    <span className="material-icons text-[14px] transition-transform duration-200"
                      style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}>
                      keyboard_arrow_down
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDark(d => !d)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${dark ? "bg-white/10 text-gray-300 hover:bg-white/15" : "bg-black/8 text-gray-600 hover:bg-black/12"}`}
            >
              <span className="material-icons text-[16px]">{dark ? "light_mode" : "dark_mode"}</span>
            </button>
            <button className={`hidden md:block text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${muted} ${pillHover}`}>
              {NAV_DATA.cta.login}
            </button>
            <button
              className="hidden md:block text-sm font-semibold px-4 py-1.5 rounded-full text-white transition-colors"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              {NAV_DATA.cta.signup}
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
          <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-2"
            style={{ width: "min(720px, 95vw)" }}>
            <div className={`${menuBg} rounded-2xl shadow-2xl border ${border} overflow-hidden`}>
              <div className="flex p-6 gap-6">

                {/* Two link columns */}
                <div className="flex gap-8 flex-1">
                  {activeLink.menu.columns.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-1 min-w-[160px]">
                      <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                        {col.heading}
                      </span>
                      {col.items.map(item => (
                        <button
                          key={item.label}
                          className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors group ${hoverRow}`}
                        >
                          <span className={`material-icons text-[16px] ${dark ? "text-gray-500" : "text-gray-400"} group-hover:text-gray-700 transition-colors`}>
                            {item.icon}
                          </span>
                          <div>
                            <p className={`text-sm font-medium ${text}`}>{item.label}</p>
                            <p className={`text-[11px] ${dark ? "text-gray-500" : "text-gray-400"}`}>{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Featured card */}
                <div className="w-[200px] shrink-0 flex flex-col gap-3">
                  <div className="relative w-full h-28 rounded-xl overflow-hidden">
                    <img
                      src={activeLink.menu.featured.img}
                      alt={activeLink.menu.featured.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full tracking-wider">
                      {activeLink.menu.featured.tag}
                    </span>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold leading-snug mb-1.5 ${text}`}>
                      {activeLink.menu.featured.title}
                    </p>
                    <p className={`text-xs leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
                      {activeLink.menu.featured.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "flex-1" : "max-h-0"}`}>
        <div className={`h-full overflow-y-auto ${dark ? "bg-[#0C0C0C]" : "bg-white"} px-6 py-4 flex flex-col gap-1 border-t ${border}`}>
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
                <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === link.label ? "max-h-[500px]" : "max-h-0"}`}>
                  <div className="pl-3 py-3 flex flex-col gap-1">
                    {link.menu.columns.flatMap(col => col.items).map(item => (
                      <button key={item.label} className={`flex items-center gap-3 py-2 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                        <span className="material-icons text-[16px] text-gray-400">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-5">
            <button className={`flex-1 py-2.5 text-sm font-medium border ${border} rounded-full ${text}`}>
              {NAV_DATA.cta.login}
            </button>
            <button className="flex-1 py-2.5 text-sm font-semibold rounded-full bg-gray-900 text-white">
              {NAV_DATA.cta.signup}
            </button>
          </div>
        </div>
      </div>

      {/* ── Page content ────────────────────────────────────────────── */}
      <div className={`flex-1 flex items-center justify-center overflow-hidden transition-colors duration-300`}>
        <span
          className="font-black select-none leading-none tracking-tight text-center px-4"
          style={{
            fontSize: "clamp(2rem, 10cqw, 8rem)",
            color: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)",
          }}
        >
          Global corporate card
        </span>
      </div>
    </div>
  )
}

export default Navbar_3
