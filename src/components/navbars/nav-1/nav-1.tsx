import { useState, useRef, useEffect } from "react"

// ─── Design tokens ────────────────────────────────────────────────────────────
// Light mode: bg-white, text-gray-900, border-gray-200
// Dark mode:  bg-[#0F0F0F], text-gray-100, border-white/10

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_DATA = {
  brand: "GOODFOLIO",
  links: [
    {
      label: "Invest",
      hasMenu: true,
      menu: {
        columns: [
          {
            heading: "Model portfolio",
            items: [
              "Socially responsible quick start",
              "Ethical growth",
              "Water tilt",
              "Emmission tilt",
              "Clean tech tilt",
            ],
          },
          {
            heading: "ETFs",
            items: [
              "All in one ETFs",
              "Equity ETFs",
              "Doing more good ETFs",
              "Bond ETFs",
              "Social responsible investing",
            ],
          },
          {
            heading: "",
            items: [
              "Reduce pollution",
              "Clean technologies",
              "Water",
              "Invest women leaders",
              "Influencing companies",
            ],
          },
        ],
        featured: {
          label: "Compare ETFs",
          description:
            "Generally, socially responsible investment indices benchmark different types of firms hailing from diverse industries and sectors.",
        },
        cards: [
          {
            title: "Fight deforestation",
            img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
          },
          {
            title: "Invest in ocean health",
            img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80",
          },
          {
            title: "Support animal welfare",
            img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&q=80",
          },
        ],
      },
    },
    { label: "Pricing", hasMenu: false },
    { label: "About", hasMenu: false },
    { label: "FAQ", hasMenu: false },
  ],
  cta: { login: "Log in", signup: "Sign up" },
}
// ─────────────────────────────────────────────────────────────────────────────

const Navbar_1 = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileInvestOpen, setMobileInvestOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const investData = NAV_DATA.links[0].menu!

  // Theme helpers
  const bg = dark ? "bg-[#0F0F0F]" : "bg-white"
  const menuBg = dark ? "bg-[#161616]" : "bg-[#F5F5F3]"
  const border = dark ? "border-white/8" : "border-gray-200"
  const text = dark ? "text-gray-100" : "text-gray-900"
  const muted = dark ? "text-gray-400" : "text-gray-500"
  const cardBg = dark ? "bg-[#1E1E1E]" : "bg-white"
  const hoverBg = dark ? "hover:bg-white/5" : "hover:bg-gray-50"
  const inputBorder = dark ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-400"

  return (
    <div className={`h-full w-full ${bg} flex flex-col transition-colors duration-300`}>

      {/* ── Navbar ──────────────────────────────────────────────────── */}
      <div ref={menuRef} className="relative shrink-0">
        <nav className={`flex items-center h-14 px-6 border-b ${border} transition-colors duration-300`}>

          {/* Left — nav links */}
          <div className="flex items-center gap-6 w-1/3">
            {NAV_DATA.links.map(link => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.hasMenu) setMenuOpen(o => !o)
                  setMobileOpen(false)
                }}
                className={`relative flex items-center gap-0.5 text-sm font-medium transition-colors ${
                  menuOpen && link.hasMenu ? `${text}` : `${muted} hover:${text.replace("text-", "text-")}`
                }`}
              >
                {link.label}
                {link.hasMenu && (
                  <span className="material-icons text-[14px] leading-none">
                    {menuOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                  </span>
                )}
                {menuOpen && link.hasMenu && (
                  <span className={`absolute -bottom-px left-0 right-0 h-[2px] ${dark ? "bg-white" : "bg-gray-900"}`} />
                )}
              </button>
            ))}
          </div>

          {/* Center — brand */}
          <div className="flex-1 flex justify-center">
            <span className={`text-sm font-bold tracking-[0.2em] ${text}`}>{NAV_DATA.brand}</span>
          </div>

          {/* Right — search + theme + mobile */}
          <div className="w-1/3 flex items-center justify-end gap-3">
            <div className={`hidden md:flex items-center gap-2 text-sm border rounded-full px-3 py-1.5 ${inputBorder}`}>
              <span className="material-icons text-[15px]">search</span>
              <span className="text-xs">Search ETFs...</span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(d => !d)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${dark ? "bg-white/10 text-gray-300 hover:bg-white/15" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              aria-label="Toggle dark mode"
            >
              <span className="material-icons text-[16px]">{dark ? "light_mode" : "dark_mode"}</span>
            </button>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <button className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${muted} ${hoverBg}`}>
                {NAV_DATA.cta.login}
              </button>
              <button className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${dark ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-700"}`}>
                {NAV_DATA.cta.signup}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden ${muted}`}
              onClick={() => { setMobileOpen(o => !o); setMenuOpen(false) }}
              aria-label="Toggle menu"
            >
              <span className="material-icons">{mobileOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </nav>

        {/* ── Mega menu ─────────────────────────────────────────────── */}
        {menuOpen && (
          <div className={`absolute top-full left-0 right-0 ${menuBg} border-b ${border} z-50 shadow-lg transition-colors duration-300`}>
            {/* Columns row */}
            <div className="flex flex-wrap px-8 pt-7 pb-5 gap-10">
              {investData.columns.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-2.5 min-w-[150px]">
                  {col.heading && (
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                      {col.heading}
                    </span>
                  )}
                  {col.items.map(item => (
                    <button
                      key={item}
                      className={`text-sm text-left transition-colors ${dark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ))}

              {/* Featured block */}
              <div className={`ml-auto flex flex-col gap-3 border ${border} rounded-2xl p-5 ${cardBg} min-w-[260px] max-w-[300px]`}>
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-sm font-semibold ${text}`}>{investData.featured.label}</span>
                  <div className={`w-7 h-7 rounded-full border ${border} flex items-center justify-center shrink-0`}>
                    <span className={`material-icons text-[13px] ${muted}`}>arrow_forward</span>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  {investData.featured.description}
                </p>
              </div>
            </div>

            {/* Image cards row */}
            <div className="flex gap-3 px-8 pb-7">
              {investData.cards.map(card => (
                <div
                  key={card.title}
                  className="relative flex-1 h-40 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-3 flex items-end justify-between">
                    <span className="text-white text-sm font-semibold leading-tight drop-shadow">
                      {card.title}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow">
                      <span className="material-icons text-[13px] text-gray-900">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "flex-1" : "max-h-0"}`}
      >
        <div className={`h-full overflow-y-auto ${bg} px-6 py-5 flex flex-col gap-1 border-t ${border}`}>
          {/* Brand */}
          <div className="flex items-center justify-between pb-4">
            <span className={`text-sm font-bold tracking-[0.2em] ${text}`}>{NAV_DATA.brand}</span>
          </div>

          {/* Invest accordion */}
          <button
            onClick={() => setMobileInvestOpen(o => !o)}
            className={`flex items-center justify-between w-full py-3 text-sm font-medium border-b ${border} ${text}`}
          >
            <span>Invest</span>
            <span className="material-icons text-[16px]">
              {mobileInvestOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${mobileInvestOpen ? "max-h-[600px]" : "max-h-0"}`}>
            <div className="flex flex-col gap-1 pl-3 pt-3 pb-2">
              {investData.columns.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-1.5 mb-4">
                  {col.heading && (
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-gray-500" : "text-gray-400"}`}>
                      {col.heading}
                    </span>
                  )}
                  {col.items.map(item => (
                    <button key={item} className={`text-sm text-left py-1 ${dark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
                      {item}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {NAV_DATA.links.slice(1).map(link => (
            <button
              key={link.label}
              className={`w-full text-left py-3 text-sm font-medium border-b ${border} ${text}`}
            >
              {link.label}
            </button>
          ))}

          <div className="flex gap-3 pt-5">
            <button className={`flex-1 py-2.5 text-sm font-medium border ${border} rounded-full ${text}`}>
              {NAV_DATA.cta.login}
            </button>
            <button className={`flex-1 py-2.5 text-sm font-semibold rounded-full ${dark ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
              {NAV_DATA.cta.signup}
            </button>
          </div>
        </div>
      </div>

      {/* ── Page content placeholder ────────────────────────────────── */}
      <div className={`flex-1 ${menuBg} flex items-center justify-center transition-colors duration-300`}>
        <span className={`text-sm ${dark ? "text-gray-700" : "text-gray-300"}`}>Page content</span>
      </div>
    </div>
  )
}

export default Navbar_1
