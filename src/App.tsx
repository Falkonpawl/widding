import "./App.css"
import { lazy, Suspense, useState, useEffect } from "react"

import goldenFlowersTop from "./assets/1/GOLDEN flowers.png"
import goldenStrokeTop from "./assets/1/GOLDEN STROKE 1.png"
import goldenFlowersBottom from "./assets/1/GOLDEN LINE 2.png"
import goldenStrokeBottom from "./assets/1/GOLDEN png.png"
import heart from "./assets/1/Heart.png"
import { Envelope } from "./components/Envelope"

const InvitationBelowFold = lazy(() => import("./InvitationBelowFold"))

function App() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1024)
    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])
  return (
    <>
      <Envelope />
      <div className="invitation">
        <div className="invitation__corner invitation__corner--strokeTop">
          <img src={goldenStrokeTop} alt="" />
        </div>
        <div className="invitation__corner invitation__corner--flowersTop">
          <img src={goldenFlowersTop} alt="" />
        </div>
        {isDesktop && (
          <>
            <div className="invitation__corner invitation__corner--flowersBottom">
              <img src={goldenFlowersBottom} alt="" />
            </div>
            <div className="invitation__corner invitation__corner--strokeBottom">
              <img src={goldenStrokeBottom} alt="" />
            </div>
          </>
        )}

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

        <Suspense fallback={null}>
          <InvitationBelowFold />
        </Suspense>
      </div>
    </>
  )
}

export default App
