import icon1 from "../assets/calendar/events/1_Церкоквь.png"
import icon2 from "../assets/calendar/events/2_Бокалы.png"
import icon3 from "../assets/calendar/events/3_Кольца.png"
import icon4 from "../assets/calendar/events/4_Начало-банкета.png"
import icon5 from "../assets/calendar/events/5_Салют.png"
import { CHURCH_MAP_URL, VENUE_MAP_URL } from "../constants/urls"

export type CalendarEventSide = "left" | "right"

export type CalendarEvent = {
  icon: string
  title: string
  time: string
  side: CalendarEventSide
  mapUrl?: string
}

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    icon: icon1,
    title: "Венчание",
    time: "13:30",
    side: "left",
    mapUrl: CHURCH_MAP_URL,
  },
  {
    icon: icon2,
    title: "Встреча гостей",
    time: "15:00",
    side: "right",
    mapUrl: VENUE_MAP_URL,
  },
  {
    icon: icon3,
    title: "Церемония обручения",
    time: "15:30",
    side: "left",
  },
  {
    icon: icon4,
    title: "Начало банкета",
    time: "17:00",
    side: "right",
  },
  {
    icon: icon5,
    title: "Окончание банкета",
    time: "23:00",
    side: "left",
  },
]
