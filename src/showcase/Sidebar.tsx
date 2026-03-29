import { useState, useRef } from "react"
import { REGISTRY, ALL_COMPONENTS, type ComponentEntry } from "./registry"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  selected: string
  onSelect: (id: string) => void
  expanded: boolean
  onToggle: () => void
}

// Build the tick structure: section dividers (red) + component ticks (white)
type Tick =
  | { kind: "section"; categoryId: string; label: string }
  | { kind: "component"; comp: ComponentEntry }

const buildTicks = (): Tick[] => {
  const ticks: Tick[] = []
  for (const category of REGISTRY) {
    ticks.push({ kind: "section", categoryId: category.id, label: category.label })
    for (const comp of category.components) {
      ticks.push({ kind: "component", comp })
    }
  }
  return ticks
}

const TICKS = buildTicks()

const Sidebar = ({ selected, onSelect, expanded, onToggle }: Props) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set(REGISTRY.map(c => c.id))
  )
  const [hoveredTick, setHoveredTick] = useState<string | null>(null)
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const totalComponents = ALL_COMPONENTS.length
  const selectedIndex = ALL_COMPONENTS.findIndex(c => c.id === selected)

  const handleTickHover = (key: string | null) => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current)
    if (key === null) {
      tooltipTimeout.current = setTimeout(() => setHoveredTick(null), 120)
    } else {
      setHoveredTick(key)
    }
  }

  return (
    <div
      className={`relative h-full shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        expanded ? "w-[272px]" : "w-[52px]"
      }`}
    >

      {/* ── Collapsed: structured tick bar ──────────────────────────── */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          expanded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="relative h-full w-full flex flex-col items-center justify-center gap-[4px] py-10">

          {TICKS.map((tick, i) => {
            if (tick.kind === "section") {
              const key = `section-${tick.categoryId}`
              const isHovered = hoveredTick === key
              return (
                <div key={key} className="relative flex items-center justify-center w-full">
                  {/* Red section bar */}
                  <button
                    onClick={onToggle}
                    onMouseEnter={() => handleTickHover(key)}
                    onMouseLeave={() => handleTickHover(null)}
                    className="w-[3px] rounded-full transition-all duration-200 bg-red-500 hover:bg-red-400"
                    style={{ height: isHovered ? "20px" : "14px" }}
                    aria-label={`Open ${tick.label} section`}
                  />
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                      <div className="bg-[#1a1a1a] border border-white/10 text-white/80 text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-xl">
                        {tick.label}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            // Component tick
            const key = tick.comp.id
            const isActive = selected === tick.comp.id
            const isHovered = hoveredTick === key
            const compIndex = ALL_COMPONENTS.findIndex(c => c.id === tick.comp.id)
            // Vary heights slightly for waveform feel
            const heights = [10, 16, 8, 20, 12, 18, 9, 14, 11, 17]
            const h = heights[compIndex % heights.length]

            return (
              <div key={key} className="relative flex items-center justify-center w-full">
                <button
                  onClick={() => onSelect(tick.comp.id)}
                  onMouseEnter={() => handleTickHover(key)}
                  onMouseLeave={() => handleTickHover(null)}
                  className={`rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-red-400 w-[3px]"
                      : "bg-white/20 hover:bg-white/50 w-[2px]"
                  }`}
                  style={{ height: isActive ? `${h + 4}px` : isHovered ? `${h + 2}px` : `${h}px` }}
                  aria-label={tick.comp.name}
                />
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                    <div className="bg-[#1a1a1a] border border-white/10 text-white/70 text-[11px] px-2.5 py-1 rounded-lg whitespace-nowrap shadow-xl">
                      {tick.comp.name}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Progress indicator at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-white/20 tabular-nums">
            {selectedIndex + 1}/{totalComponents}
          </div>
        </div>
      </div>

      {/* ── Expanded panel ───────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 flex flex-col transition-opacity duration-200 ${
          expanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-semibold">Components</span>
            <span className="text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded-full tabular-nums">
              {totalComponents}
            </span>
          </div>
          <button
            onClick={onToggle}
            className="w-6 h-6 flex items-center justify-center rounded-md text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={14} />
          </button>
        </div>

        {/* Category + component list */}
        <div className="flex-1 min-h-0 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
          {REGISTRY.map(category => {
            const isOpen = openCategories.has(category.id)
            return (
              <div key={category.id} className="flex flex-col">

                {/* Category row — red accent */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center justify-between w-full px-2 py-2 rounded-lg group transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-2.5">
                    {/* Red section indicator */}
                    <div className="w-[3px] h-3.5 rounded-full bg-red-500/70 group-hover:bg-red-400 transition-colors shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                      {category.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-white/20 tabular-nums">{category.components.length}</span>
                    <ChevronRight
                      size={12}
                      className="text-white/20 transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                    />
                  </div>
                </button>

                {/* Component entries */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ maxHeight: isOpen ? `${category.components.length * 72}px` : "0px" }}
                >
                  <div className="flex flex-col gap-0.5 pl-3 pt-0.5 pb-2">
                    {category.components.map((comp: ComponentEntry) => {
                      const isSelected = selected === comp.id
                      return (
                        <button
                          key={comp.id}
                          onClick={() => onSelect(comp.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 border group ${
                            isSelected
                              ? "bg-white/8 border-white/10 text-white"
                              : "border-transparent text-white/40 hover:text-white/75 hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {/* White tick for component */}
                            <div
                              className={`w-[2px] rounded-full shrink-0 transition-all ${
                                isSelected ? "h-3.5 bg-red-400" : "h-2.5 bg-white/15 group-hover:bg-white/30"
                              }`}
                            />
                            <span className="text-sm font-medium leading-none">{comp.name}</span>
                          </div>
                          <p className="text-[11px] text-white/25 mt-1.5 leading-relaxed line-clamp-1 pl-3.5">
                            {comp.description}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Footer — mini tick strip mirroring collapsed bar */}
        <div className="px-4 py-3 border-t border-white/5 flex items-end gap-[3px]">
          {TICKS.map((tick, i) => (
            tick.kind === "section"
              ? <div key={i} className="w-[3px] h-3 rounded-full bg-red-500/40 shrink-0" />
              : <div
                  key={i}
                  className={`w-[2px] rounded-full shrink-0 transition-colors ${
                    tick.comp.id === selected ? "bg-red-400" : "bg-white/10"
                  }`}
                  style={{ height: `${[6,9,5,11,7,8,5,10,6,8][ALL_COMPONENTS.findIndex(c=>c.id===tick.comp.id) % 10]}px` }}
                />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
