import { useRef } from "react"

import heartWithNumber from "../assets/calendar/heart_with_number.svg"
import miniheart from "../assets/calendar/mini_heart.svg"
import { CALENDAR_EVENTS } from "../data/calendarEvents"
import { useCalendarScrollHeart } from "../lib/calendarScrollHeart"
import { ScrollReveal } from "./ScrollReveal"

const LINE_PATH_D =
  "M196.569 0.886719C175.481 159.844 338.03 164.15 322.609 286.256C303.302 439.13 38.3447 409.718 38.3436 567.932C38.3425 726.145 336.53 703.631 344.986 867.868C353.442 1032.1 137.768 990.039 38.3436 1095.08C-73.2167 1212.94 95.0133 1279.08 217.387 1323.46C314.022 1358.5 366.475 1413.71 366.469 1480.61C366.463 1546.82 306.768 1606.89 200.41 1689.54"

const LINE_VIEWBOX = { width: 368, height: 1691 }

export function CalendarScrollHeart() {
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
  })

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
