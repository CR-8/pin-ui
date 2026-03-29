import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { X, AtSign, Send, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(useGSAP)

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_DATA = {
  logo: "CG",
  mainLinks: [
    { label: "Home",     href: "#" },
    { label: "Showcase", href: "#" },
    { label: "About",    href: "#" },
    { label: "Contact",  href: "#" },
    { label: "Journal",  href: "#" },
  ],
  social: [
    { label: "Instagram", icon: AtSign,       href: "#" },
    { label: "Twitter",   icon: X,            href: "#" },
    { label: "LinkedIn",  icon: Send,         href: "#" },
  ],
  footer: {
    location: { label: "Location", value: "Amsterdam, NL" },
    inquiries: { label: "Inquiries", value: "hello@codegrid.com" },
    copy: "© 2025 Codegrid",
  },
  hero: {
    line1: "CREATIVE",
    line2: "DEVELOPER",
  },
}
// ─────────────────────────────────────────────────────────────────────────────

const Navbar_5 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef  = useRef<HTMLDivElement>(null)
  const overlayRef    = useRef<HTMLDivElement>(null)
  const contentRef    = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  // Smooth scroll
  useEffect(() => {
    lenisRef.current = new Lenis()
    const raf = (time: number) => {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenisRef.current?.destroy()
  }, [])

  useGSAP(() => {
    // Initial states
    gsap.set(overlayRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    })
    gsap.set('.nav5-link-item p', { y: 60 })
    gsap.set('.nav5-social-item p', { y: 30 })
    gsap.set(contentRef.current, { y: -80, opacity: 0 })

    tl.current = gsap.timeline({ paused: true })
      // Nav label slides up
      .to('.nav5-label p', {
        y: -30,
        duration: 0.4,
        ease: 'power4.inOut',
      })
      // Main content pushes down
      .to(mainContentRef.current, {
        y: 120,
        duration: 1.2,
        ease: 'power4.inOut',
      }, 0)
      // Overlay clips in from top
      .to(overlayRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.2,
        ease: 'power4.inOut',
      }, 0)
      // Content slides down into view
      .to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.inOut',
      }, 0)
      // Main links stagger in
      .to('.nav5-link-item p', {
        y: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: 'power4.out',
      }, 0.3)
      // Social links stagger in
      .to('.nav5-social-item p', {
        y: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'power4.out',
      }, 0.5)
  }, { scope: containerRef })

  const toggleMenu = () => {
    if (isOpen) {
      tl.current?.reverse()
      lenisRef.current?.start()
    } else {
      tl.current?.play()
      lenisRef.current?.stop()
    }
    setIsOpen(prev => !prev)
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full bg-[#0f0f0f] text-white overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >

      {/* ── Fixed nav bar ───────────────────────────────────────────── */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-100">

        {/* Logo */}
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
          <span className="text-xs font-bold tracking-widest">{NAV_DATA.logo}</span>
        </div>

        {/* Toggle button */}
        <button
          onClick={toggleMenu}
          className="flex items-center gap-3 cursor-pointer group"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {/* "Menu" label — slides up on open */}
          <div className="nav5-label h-[18px] overflow-hidden hidden md:block">
            <p className="text-xs uppercase tracking-[0.15em] text-white/70 group-hover:text-white transition-colors">
              Menu
            </p>
          </div>

          {/* Hamburger circle */}
          <div className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] border border-white/20 rounded-full relative overflow-hidden group-hover:border-white/40 transition-colors">
            <span className={`w-4 h-px bg-white transition-all duration-500 origin-center ${isOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`w-4 h-px bg-white transition-all duration-500 origin-center ${isOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </div>
        </button>
      </nav>

      {/* ── Full-screen overlay ─────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#141414] z-90 overflow-hidden"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
      >
        <div
          ref={contentRef}
          className="w-full h-full flex flex-col md:flex-row px-8 md:px-16 pt-24 pb-10"
          style={{ opacity: 0 }}
        >

          {/* Left — decorative image area */}
          <div className="hidden md:flex flex-1 items-end pb-12 pr-12">
            <div className="w-[65%] aspect-4/5 bg-white/5 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Featured</p>
                <p className="text-sm text-white/60 font-medium">Latest work</p>
              </div>
              <ArrowUpRight className="absolute top-4 right-4 text-white/20" size={18} />
            </div>
          </div>

          {/* Right — links + footer */}
          <div className="flex-2 flex flex-col justify-between">

            {/* Main + social links */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 pt-4">

              {/* Main nav links */}
              <div className="flex flex-col gap-2">
                {NAV_DATA.mainLinks.map(link => (
                  <div key={link.label} className="nav5-link-item overflow-hidden">
                    <p
                      className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter cursor-pointer transition-all duration-300 hover:italic hover:text-white/60 leading-tight"
                      style={{ transform: 'translateY(60px)' }}
                    >
                      {link.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Social + secondary */}
              <div className="flex flex-col gap-2 md:pt-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Follow Us</p>
                {NAV_DATA.social.map(({ label, icon: Icon, href }) => (
                  <div key={label} className="nav5-social-item overflow-hidden">
                    <a
                      href={href}
                      className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors uppercase tracking-widest group"
                      style={{ transform: 'translateY(30px)' }}
                    >
                      <Icon size={13} />
                      <p>{label}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer row */}
            <div className="flex justify-between items-end border-t border-white/8 pt-8 mt-8">
              <div className="flex gap-12 md:gap-20">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                    {NAV_DATA.footer.location.label}
                  </p>
                  <p className="text-sm text-white mt-2 font-medium">
                    {NAV_DATA.footer.location.value}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                    {NAV_DATA.footer.inquiries.label}
                  </p>
                  <p className="text-sm text-white mt-2 font-medium">
                    {NAV_DATA.footer.inquiries.value}
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-white/25 uppercase tracking-widest">
                {NAV_DATA.footer.copy}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main site content ───────────────────────────────────────── */}
      <main ref={mainContentRef} className="relative z-10 h-full w-full">

        {/* Hero section */}
        <section className="h-full flex flex-col items-center justify-center px-8">
          <h1
            className="font-medium leading-[0.88] tracking-tighter text-center select-none"
            style={{ fontSize: 'clamp(3.5rem, 14cqw, 12rem)' }}
          >
            {NAV_DATA.hero.line1}
            <br />
            {NAV_DATA.hero.line2}
          </h1>
          <p className="text-white/30 text-sm mt-8 uppercase tracking-[0.2em]">
            Scroll to explore
          </p>
        </section>
      </main>
    </div>
  )
}

export default Navbar_5
