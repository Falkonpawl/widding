import { useEffect, useState } from "react"

import ringsPhoto from "../assets/photo.svg"

const WEDDING_AT = new Date(2026, 7, 7, 13, 30, 0)

type Remaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getRemaining(target: Date, now: Date): Remaining {
  const diff = Math.max(0, target.getTime() - now.getTime())
  const totalSec = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  }
}

const UNITS: { key: keyof Remaining; label: string }[] = [
  { key: "days", label: "дней" },
  { key: "hours", label: "часов" },
  { key: "minutes", label: "минут" },
  { key: "seconds", label: "секунд" },
]

export function WeddingCountdown() {
  const [remaining, setRemaining] = useState<Remaining>(() =>
    getRemaining(WEDDING_AT, new Date())
  )

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(WEDDING_AT, new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="invitation__countdown">
      <p className="invitation__title-text invitation__countdown-title">
        Мы скажем
        <br />
        «Да» через...
      </p>
      <div className="invitation__countdown-timer" role="timer" aria-live="polite">
        {UNITS.map((unit, index) => (
          <div key={unit.key} className="invitation__countdown-item">
            {index > 0 && (
              <span className="invitation__countdown-sep" aria-hidden>
                :
              </span>
            )}
            <div className="invitation__countdown-unit">
              <div className="invitation__countdown-circle">
                {remaining[unit.key]}
              </div>
              <span className="invitation__countdown-label">{unit.label}</span>
            </div>
          </div>
        ))}
      </div>
      <img className="invitation__countdown-rings" src={ringsPhoto} alt="" />
    </section>
  )
}
