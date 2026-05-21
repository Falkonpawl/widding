import { useEffect, useRef, useState, type ComponentType } from "react"
import { LoadingScreen } from "../components/LoadingScreen"
import { delay } from "../lib/preload"
import { lockPageScroll, unlockPageScroll } from "../lib/scrollLock"
import { runCriticalPreload } from "../assets/preload/criticalPreload"

const MIN_LOADER_MS = 1500

type BootPhase = "loading" | "ready"

export function AppBootstrap() {
  const [phase, setPhase] = useState<BootPhase>("loading")
  const [App, setApp] = useState<ComponentType | null>(null)
  const scrollHandoffRef = useRef(false)

  useEffect(() => {
    if (phase !== "loading") return

    scrollHandoffRef.current = false
    lockPageScroll()

    let cancelled = false

    ;(async () => {
      await Promise.all([runCriticalPreload(), delay(MIN_LOADER_MS)])
      if (cancelled) return

      const { default: AppComponent } = await import("../App")
      if (cancelled) return

      scrollHandoffRef.current = true
      setApp(() => AppComponent)
      setPhase("ready")

      const { preloadDeferredAssets } = await import(
        "../assets/preload/deferredPreload"
      )
      preloadDeferredAssets()
    })()

    return () => {
      cancelled = true
      if (!scrollHandoffRef.current) unlockPageScroll()
    }
  }, [phase])

  return (
    <>
      {phase === "loading" && <LoadingScreen />}
      {App && <App />}
    </>
  )
}
