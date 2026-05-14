import "./App.css"

import goldenFlowers from "./assets/1/GOLDEN flowers.png"
import goldenStroke from "./assets/1/GOLDEN STROKE 1.png"
import ourFoto1 from "./assets/our foto/first foto.webp"
import heart from "./assets/1/Heart.png"

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
      <p className="invitation__title-text">Наш август</p>
      <div className="invitation__calendar">
        <div className="invitation__calendar-row">
          <div className="invitation__calendar-mini-day">5</div>
          <div className="invitation__calendar-day">6</div>
        </div>
        <div className="invitation__calendar-row">
          <div className="invitation__calendar-day">8</div>
          <div className="invitation__calendar-mini-day">9</div>
        </div>
      </div>
    </div>
  )
}

export default App
