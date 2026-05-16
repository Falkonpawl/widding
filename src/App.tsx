import "./App.css"

import goldenFlowers from "./assets/1/GOLDEN flowers.png"
import goldenStroke from "./assets/1/GOLDEN STROKE 1.png"
import ourFoto1 from "./assets/Our foto/first foto.webp"
import ourFoto2 from "./assets/Our foto/second foto.jpg"
import ourFoto3 from "./assets/Our foto/third foto.jpg"
import ourFoto4 from "./assets/Our foto/four foto.jpg"
import heart from "./assets/1/Heart.png"
import frame from "./assets/location/frame.svg"
import locationPhoto from "./assets/location/lokation_yakimowich.jpg"
import num1 from "./assets/numbers/1.svg"
import num2 from "./assets/numbers/2.svg"
import num3 from "./assets/numbers/3.svg"
import { CalendarScrollHeart } from "./components/CalendarScrollHeart"
import { GuestQuestionnaire } from "./components/GuestQuestionnaire"
import { WeddingCountdown } from "./components/WeddingCountdown"

const LOCATION_MAP_URL = "https://yandex.by/maps/-/CPsAvT8d"
const WISHES_TELEGRAM_URL = "https://t.me/+cHzAeafrd4g2ZWIy"

const WISHES_ITEMS = [
  {
    num: num1,
    text: "Пожалуйста, не ломайте голову над подарками! Мы будем очень рады вашему приятному вкладу в бюджет нашей молодой семьи.",
  },
  {
    num: num2,
    text: "Приятным комплиментом для нас будет, если вместо цветов Вы решите подарить нам бутылочку вина для нашей семейной винотеки.",
  },
  {
    num: num3,
    text: "Мы создали телеграм-группу нашего праздника, где можно будет узнать дополнительную информацию, а также поделиться фотографиями и видео в день свадьбы и после.",
  },
] as const

function App() {
  return (
    <div className="invitation">
      <div
        className="invitation__corner invitation__corner--stroke"
        aria-hidden
      >
        <img src={goldenStroke} alt="" />
      </div>
      <div
        className="invitation__corner invitation__corner--flowers"
        aria-hidden
      >
        <img src={goldenFlowers} alt="" />
      </div>

      <main className="invitation__main">
        <div className="invitation__heart-wrap">
          <img className="invitation__heart-img" src={heart} alt="" />
          <div className="invitation__names">
            <span>Павел</span>
            <span className="invitation__and">&</span>
            <span>Злата</span>
          </div>
        </div>
      </main>

      <p className="invitation__chapter">
        Разделите с нами это главное событие лета — подарите нам свое внимание и
        поддержку.
      </p>

      <div className="invitation__first-our-foto">
        <div className="our-foto-photo-frame">
          <img src={ourFoto1} alt="" />
        </div>
      </div>
      <p className="invitation__title-text">Дорогие гости!</p>
      <p className="invitation__second-text">
        Мы очень хотим сделать этот день особенным, поэтому приглашаем Вас
        разделить с нами торжество, посвященное дню нашей свадьбы!
      </p>
      <CalendarScrollHeart />
      <div className="invitation__frame">
        <img src={frame} alt="" aria-hidden />
        <div className="invitation__location">
          <p className="invitation__title-text invitation__location-title">
            Локация
          </p>
          <div className="invitation__location-photo">
            <img src={locationPhoto} alt="Место проведения" />
          </div>
          <p className="invitation__location-address">
            г. Глубокое,
            <br />
            ул. Гагарина д.20
          </p>
          <a
            className="invitation__location-map-btn"
            href={LOCATION_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Перейти на карту
          </a>
        </div>
      </div>
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
            <li key={index} className="invitation__wishes-item">
              <img className="invitation__wishes-num" src={item.num} alt="" />
              <p className="invitation__wishes-text">{item.text}</p>
            </li>
          ))}
        </ol>
        <a
          className="invitation__wishes-btn"
          href={WISHES_TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Вступить в группу
        </a>
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
      <p className="invitation__title-text invitation__four-our-foto-sign">
        С любовью, Павел и Злата!
      </p>
    </div>
  )
}

export default App
