import { useRef } from "react"

import heartWithNumber from "../assets/calendar/heart_with_number.svg"
import miniheart from "../assets/calendar/mini_heart.svg"
import { FAREWELL_LUNCH } from "../data/farewellLunch"
import { useCalendarScrollHeart } from "../lib/calendarScrollHeart"
import { ScrollReveal } from "./ScrollReveal"

const FAREWELL_LINE_PATH_D = "M 184 0 L 184 340"
const FAREWELL_LINE_VIEWBOX = { width: 368, height: 340 }

/** Смещение сердца — правьте здесь (px, минус = вверх/влево). */
const FAREWELL_HEART_OFFSET = {
  startLiftPx: 0,
  startLeftPx: 0,
  endLiftPx: 0,
  endLeftPx: 0,
  /** Влево/вправо на всём пути */
  heartOffsetX: -2,
  /** Вверх/вниз на всём пути (как startAnchorLiftPx, но для всей линии) */
  heartOffsetY: 0,
  /** Старт выше: минус = вверх (теперь реально двигает сердце) */
  startAnchorLiftPx: -20,
} as const

export function FarewellCalendarSection() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const miniheartRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)

  useCalendarScrollHeart({
    sceneRef,
    lineRef,
    pathRef,
    svgRef,
    heartRef,
    miniheartRef,
    ...FAREWELL_HEART_OFFSET,
    smoothLerp: 0.14,
    scrollStartVp: 0.22,
    scrollEndVp: 0.88,
  })

  return (
    <div className="calendar-scene calendar-scene--farewell" ref={sceneRef}>
      <div className="invitation__calendar">
        <div className="invitation__calendar-row">
          <div className="invitation__calendar-mini-day">6</div>
          <div className="invitation__calendar-day">7</div>
        </div>
        {/* <div className="invitation__miniheart" ref={miniheartRef}>
          <img src={miniheart} alt="" />
        </div> */}
        <div className="invitation__calendar-row">
          <div className="invitation__calendar-day">9</div>
          <div className="invitation__calendar-mini-day">10</div>
        </div>
      </div>

      <div className="calendar-line-wrap farewell-line-wrap" ref={lineRef}>
        <div className="invitation__line">
          <svg
            ref={svgRef}
            className="invitation__line-svg"
            viewBox={`0 0 ${FAREWELL_LINE_VIEWBOX.width} ${FAREWELL_LINE_VIEWBOX.height}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <path
              ref={pathRef}
              d={FAREWELL_LINE_PATH_D}
              fill="none"
              stroke="#474E33"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div
          className="farewell-lunch-row"
          aria-label="Прощальный обед"
        >
          <ScrollReveal
            className="farewell-lunch-row__left calendar-event calendar-event--left"
          >
            <div className="calendar-event__inner">
              <img
                className="calendar-event__icon"
                src={FAREWELL_LUNCH.icon}
                alt=""
              />
              <p className="calendar-event__title">{FAREWELL_LUNCH.title}</p>
              <p className="calendar-event__time">{FAREWELL_LUNCH.time}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal
            className="farewell-lunch-row__right calendar-event calendar-event--right"
            delay={80}
          >
            <p className="farewell-lunch-row__description">
              {FAREWELL_LUNCH.description}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div
        ref={heartRef}
        className="calendar-scene__heart calendar-scene__heart--farewell"
      >
        <img
          className="calendar-scene__heart-img"
          src={heartWithNumber}
          alt=""
        />
        <span className="calendar-scene__heart-num">8</span>
      </div>
    </div>
  )
}
