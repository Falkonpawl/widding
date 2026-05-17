import { useCallback, useEffect, useRef } from "react"

import heartWithNumber from "../assets/calendar/heart_with_number.svg"
import miniheart from "../assets/calendar/mini_heart.svg"
import { CALENDAR_EVENTS } from "../data/calendarEvents"
import { ScrollReveal } from "./ScrollReveal"

const LINE_PATH_D =
  "M196.569 0.886719C175.481 159.844 338.03 164.15 322.609 286.256C303.302 439.13 38.3447 409.718 38.3436 567.932C38.3425 726.145 336.53 703.631 344.986 867.868C353.442 1032.1 137.768 990.039 38.3436 1095.08C-73.2167 1212.94 95.0133 1279.08 217.387 1323.46C314.022 1358.5 366.475 1413.71 366.469 1480.61C366.463 1546.82 306.768 1606.89 200.41 1689.54"

const LINE_VIEWBOX = { width: 368, height: 1691 }
const SCROLL_START_VP = 0.3
const SCROLL_END_VP = 0.7
const PATH_T_SAMPLES = 200
/** Сдвиг старта (px), нарастает на первых 5% скролла */
const START_LIFT_PX = -16
const START_LEFT_PX = -5
/** Довоз в конце: вниз и вправо (px), нарастает на последних 5% скролла */
const END_LIFT_PX = 10
const END_LEFT_PX = -16
const END_FADE_START = 0.95

type Point = { x: number; y: number }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getElementCenter(el: HTMLElement, container: HTMLElement): Point {
  const rect = el.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2 - containerRect.left,
    y: rect.top + rect.height / 2 - containerRect.top,
  }
}

function getPathPointInContainer(
  path: SVGPathElement,
  svg: SVGSVGElement,
  container: HTMLElement,
  t: number,
): Point {
  const length = path.getTotalLength()
  const point = path.getPointAtLength(length * clamp(t, 0, 1))
  const ctm = path.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }

  const screen = new DOMPoint(point.x, point.y).matrixTransform(ctm)
  const containerRect = container.getBoundingClientRect()
  return {
    x: screen.x - containerRect.left,
    y: screen.y - containerRect.top,
  }
}

function findClosestPathT(
  path: SVGPathElement,
  svg: SVGSVGElement,
  container: HTMLElement,
  target: Point,
): number {
  let bestT = 0
  let bestDist = Infinity

  for (let i = 0; i <= PATH_T_SAMPLES; i++) {
    const t = i / PATH_T_SAMPLES
    const p = getPathPointInContainer(path, svg, container, t)
    const dist = (p.x - target.x) ** 2 + (p.y - target.y) ** 2
    if (dist < bestDist) {
      bestDist = dist
      bestT = t
    }
  }

  return bestT
}

function getLineScrollProgress(lineEl: HTMLElement): number {
  const vh = window.innerHeight
  const startMark = vh * SCROLL_START_VP
  const endMark = vh * SCROLL_END_VP
  const rect = lineEl.getBoundingClientRect()
  const endTop = endMark - rect.height

  if (rect.top >= startMark) return 0
  if (rect.top <= endTop) return 1

  return (startMark - rect.top) / (startMark - endTop)
}

export function CalendarScrollHeart() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const miniheartRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)

  const pathStartTRef = useRef(0)
  const rafRef = useRef(0)

  const refreshPathStartT = useCallback(() => {
    const scene = sceneRef.current
    const miniheartEl = miniheartRef.current
    const path = pathRef.current
    const svg = svgRef.current
    if (!scene || !miniheartEl || !path || !svg) return

    const miniheartImg = miniheartEl.querySelector("img")
    const anchor = getElementCenter(
      miniheartImg instanceof HTMLElement ? miniheartImg : miniheartEl,
      scene,
    )
    anchor.y += START_LIFT_PX
    pathStartTRef.current = findClosestPathT(path, svg, scene, anchor)
  }, [])

  const updateHeart = useCallback(() => {
    const scene = sceneRef.current
    const line = lineRef.current
    const path = pathRef.current
    const svg = svgRef.current
    const heart = heartRef.current
    if (!scene || !line || !path || !svg || !heart) return

    const progress = getLineScrollProgress(line)
    const startT = pathStartTRef.current
    const pathT = progress <= 0 ? startT : startT + progress * (1 - startT)

    const pos = getPathPointInContainer(path, svg, scene, pathT)
    const startFade = 1 - clamp(progress / 0.05, 0, 1)
    const endFade = clamp(
      (progress - END_FADE_START) / (1 - END_FADE_START),
      0,
      1,
    )
    const x = pos.x + START_LEFT_PX * startFade + END_LEFT_PX * endFade
    const y = pos.y + START_LIFT_PX * startFade + END_LIFT_PX * endFade

    heart.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
  }, [])

  useEffect(() => {
    refreshPathStartT()
    updateHeart()

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateHeart)
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", () => {
      refreshPathStartT()
      scheduleUpdate()
    })

    const ro = new ResizeObserver(() => {
      refreshPathStartT()
      scheduleUpdate()
    })
    if (sceneRef.current) ro.observe(sceneRef.current)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      ro.disconnect()
    }
  }, [refreshPathStartT, updateHeart])

  return (
    <div className="calendar-scene" ref={sceneRef}>
      <p className="invitation__title-text">Наш август</p>

      <div className="invitation__calendar">
        <div className="invitation__calendar-row">
          <div className="invitation__calendar-mini-day">5</div>
          <div className="invitation__calendar-day">6</div>
        </div>
        <div className="invitation__miniheart" ref={miniheartRef}>
          <img src={miniheart} alt="" />
        </div>
        <div className="invitation__calendar-row">
          <div className="invitation__calendar-day">8</div>
          <div className="invitation__calendar-mini-day">9</div>
        </div>
      </div>

      <div className="calendar-line-wrap" ref={lineRef}>
        <div className="invitation__line">
          <svg
            ref={svgRef}
            className="invitation__line-svg"
            viewBox={`0 0 ${LINE_VIEWBOX.width} ${LINE_VIEWBOX.height}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <path
              ref={pathRef}
              d={LINE_PATH_D}
              fill="none"
              stroke="#474E33"
              strokeWidth="2"
            />
          </svg>
        </div>
        <ul className="calendar-events" aria-label="Расписание дня">
          {CALENDAR_EVENTS.map((event, i) => (
            <ScrollReveal
              key={event.title}
              as="li"
              className={`calendar-event calendar-event--${event.side} calendar-event--row${i + 1}`}
              style={{ gridRow: i + 1 }}
              delay={i * 80}
            >
              <div className="calendar-event__inner">
                <img className="calendar-event__icon" src={event.icon} alt="" />
                <p className="calendar-event__title">{event.title}</p>
                <p className="calendar-event__time">{event.time}</p>
                {event.mapUrl && (
                  <a
                    className="calendar-event__map-btn invitation__location-map-btn"
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Карта
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </div>

      <div ref={heartRef} className="calendar-scene__heart">
        <img
          className="calendar-scene__heart-img"
          src={heartWithNumber}
          alt=""
        />
        <span className="calendar-scene__heart-num">7</span>
      </div>
    </div>
  )
}
