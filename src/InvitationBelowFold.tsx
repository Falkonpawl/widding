import ourFoto1 from "./assets/Our foto/first foto.webp"
import ourFoto2 from "./assets/Our foto/second foto.jpg"
import ourFoto3 from "./assets/Our foto/third foto.jpg"
import ourFoto4 from "./assets/Our foto/four foto.jpg"
import frame from "./assets/location/frame.svg"
import locationPhoto from "./assets/location/lokation_yakimowich.jpg"
import num1 from "./assets/numbers/1.svg"
import num2 from "./assets/numbers/2.svg"
import num3 from "./assets/numbers/3.svg"
import mini_heart from "./assets/calendar/mini_heart.svg"
import { CalendarScrollHeart } from "./components/CalendarScrollHeart"
import { FarewellCalendarSection } from "./components/FarewellCalendarSection"
import { GuestQuestionnaire } from "./components/GuestQuestionnaire"
import { ScrollReveal } from "./components/ScrollReveal"
import { WeddingCountdown } from "./components/WeddingCountdown"
import { VENUE_MAP_URL } from "./constants/urls"

const WISHES_TELEGRAM_URL = "https://t.me/+cHzAeafrd4g2ZWIy"

const WISHES_ITEMS = [
  {
    num: num1,
    text: "Пожалуйста, не ломайте голову над подарками! Мы будем очень рады вашему приятному вкладу в бюджет нашей молодой семьи.",
  },
  {
    num: num2,
    text: "Сразу после торжества мы уезжаем в путешествие! Цветы, увы, не переживут дороги:( А вот бутылочка вашего любимого алкоголя для нашего семейного бара будет идеальна. Вино, ром, джин, текила любой напиток найдёт своё место и повод за вас выпить!",
  },
  {
    num: num3,
    text: "Мы создали телеграм-группу нашего праздника, где можно будет узнать дополнительную информацию, а также поделиться фотографиями и видео в день свадьбы и после.",
  },
] as const

export default function InvitationBelowFold() {
  return (
    <>
      <p className="invitation__chapter">
        Это главное событие лета! Подарите нам своё внимание и поддержку — для
        нас это дороже любых подарков.
      </p>

      <div className="invitation__first-our-foto">
        <div className="our-foto-photo-frame">
          <img src={ourFoto1} alt="" />
        </div>
      </div>
      <p className="invitation__title-text">Дорогие гости!</p>
      <ScrollReveal as="p" className="invitation__second-text">
        Мы очень хотим сделать этот день особенным, поэтому приглашаем вас разделить с нами торжество, посвящённое дню нашей свадьбы!
      </ScrollReveal>
      <CalendarScrollHeart />
      <div className="invitation__frame">
        <img src={frame} alt="" aria-hidden />
        <ScrollReveal className="invitation__location">
          <p className="invitation__title-text invitation__location-title">
            Локация
          </p>
          <div className="invitation__location-photo">
            <img src={locationPhoto} alt="Место проведения" />
          </div>
          <p className="invitation__title-text invitation__location-venue">
            Усадьба Якимович
          </p>
          <p className="invitation__location-address">
            г. Глубокое,
            <br />
            ул. Гагарина д.20
          </p>
          <a
            className="invitation__location-map-btn"
            href={VENUE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Перейти на карту
          </a>
        </ScrollReveal>
      </div>
      <FarewellCalendarSection />
      <WeddingCountdown />
      <div className="invitation__second-our-foto">
        <div className="our-foto-photo-frame">
          <img src={ourFoto2} alt="" />
        </div>
      </div>
      <section className="invitation__wishes">
        <p className="invitation__title-text invitation__wishes-title">
          Пожелания
        </p>
        <ol className="invitation__wishes-list">
          {WISHES_ITEMS.map((item, index) => (
            <ScrollReveal
              key={index}
              as="li"
              className="invitation__wishes-item"
              delay={index * 80}
            >
              <img className="invitation__wishes-num" src={item.num} alt="" />
              <p className="invitation__wishes-text">{item.text}</p>
            </ScrollReveal>
          ))}
        </ol>
        <ScrollReveal className="invitation__wishes-btn-wrap" delay={240}>
          <a
            className="invitation__wishes-btn"
            href={WISHES_TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Вступить в группу
          </a>
        </ScrollReveal>
      </section>
      <div className="invitation__third-our-foto">
        <div className="our-foto-photo-frame">
          <img src={ourFoto3} alt="" />
        </div>
      </div>
      <GuestQuestionnaire />
      <div className="invitation__four-our-foto">
        <div className="our-foto-photo-frame">
          <img src={ourFoto4} alt="" />
        </div>
      </div>
      <div className="invitation__four-our-foto-sign-wrap">
        <ScrollReveal
          as="p"
          className="invitation__title-text invitation__four-our-foto-sign"
        >
          С любовью,
          <br />
          Павел и Злата!
        </ScrollReveal>
        <ScrollReveal className="invitation_mini_heart_end">
          <img src={mini_heart}/>
        </ScrollReveal>
      </div>
    </>
  )
}
