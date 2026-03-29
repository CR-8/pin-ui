import { useState, useRef, useEffect, useCallback } from "react"
import Lenis from "lenis"
import Sidebar from "./Sidebar"
import { REGISTRY, ALL_COMPONENTS } from "./registry"

const Showcase = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedId, setSelectedId] = useState(ALL_COMPONENTS[0]?.id ?? "")
  const scrollRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const isProgrammatic = useRef(false)
  const snapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Init Lenis on the scroll container ──────────────────────────
  useEffect(() => {
    const wrapper = scrollRef.current
    if (!wrapper) return

    const lenis = new Lenis({
      wrapper,
      content: wrapper,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // ── Snap to nearest slide on scroll stop ──────────────────────
    lenis.on("scroll", () => {
      if (isProgrammatic.current) return
      if (snapTimeout.current) clearTimeout(snapTimeout.current)
      snapTimeout.current = setTimeout(() => {
        snapToNearest()
      }, 120)
    })

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Find which slide is closest to the top of the container and snap to it
  const snapToNearest = useCallback(() => {
    const wrapper = scrollRef.current
    if (!wrapper) return
    const scrollTop = wrapper.scrollTop

    let closest = ALL_COMPONENTS[0]
    let minDist = Infinity

    ALL_COMPONENTS.forEach(comp => {
      const el = document.getElementById(`comp-${comp.id}`)
      if (!el) return
      const dist = Math.abs(el.offsetTop - scrollTop)
      if (dist < minDist) { minDist = dist; closest = comp }
    })

    if (closest && closest.id !== selectedId) {
      setSelectedId(closest.id)
    }

    // Smooth snap to the closest slide
    const targetEl = document.getElementById(`comp-${closest.id}`)
    if (!targetEl) return
    isProgrammatic.current = true
    lenisRef.current?.scrollTo(targetEl.offsetTop, {
      duration: 0.7,
      easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    })
    setTimeout(() => { isProgrammatic.current = false }, 900)
  }, [selectedId])

  // ── IntersectionObserver — update active id while scrolling ─────
  useEffect(() => {
    const wrapper = scrollRef.current
    if (!wrapper) return
    const observers: IntersectionObserver[] = []

    ALL_COMPONENTS.forEach(comp => {
      const el = document.getElementById(`comp-${comp.id}`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setSelectedId(comp.id)
          }
        },
        { threshold: 0.5, root: wrapper }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // ── Sidebar click → scroll to component ─────────────────────────
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id)
    const el = document.getElementById(`comp-${id}`)
    if (!el || !lenisRef.current) return
    isProgrammatic.current = true
    if (snapTimeout.current) clearTimeout(snapTimeout.current)
    lenisRef.current.scrollTo(el.offsetTop, {
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    setTimeout(() => { isProgrammatic.current = false }, 1300)
  }, [])

  const selected = ALL_COMPONENTS.find(c => c.id === selectedId)

  return (
    <div className="h-screen w-screen bg-[#111111] flex overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        selected={selectedId}
        onSelect={handleSelect}
        expanded={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
      />

      {/* Divider */}
      <div className="w-px bg-white/5 shrink-0" />

      {/* Preview area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-white/80 text-sm font-semibold">{selected?.name}</span>
            {selected && (
              <span className="text-[11px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full capitalize">
                {selected.category}
              </span>
            )}
          </div>
          <p className="text-white/25 text-xs truncate max-w-xs">{selected?.description}</p>
        </div>

        {/* Lenis scroll container — no CSS snap, we snap programmatically */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ overscrollBehavior: "none" }}
        >
          {REGISTRY.map(category =>
            category.components.map(comp => {
              const Component = comp.component
              const isFirst = category.components[0].id === comp.id
              return (
                <div
                  key={comp.id}
                  id={`comp-${comp.id}`}
                  className="relative p-4"
                  style={{ height: "100cqh" }}
                >
                  {/* Section label badge on first of each category */}
                  {isFirst && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                        {category.label}
                      </span>
                    </div>
                  )}
                  <div className="h-full w-full rounded-xl overflow-auto" style={{ containerType: "size" }}>
                    <Component />
                  </div>
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}

export default Showcase
