import { useEffect, useState, type ComponentType } from "react"
import { LoadingScreen } from "../components/LoadingScreen"
import { delay } from "../lib/preload"
import { runCriticalPreload } from "../assets/preload/criticalPreload"

const MIN_LOADER_MS = 1500

type BootPhase = "loading" | "ready"

export function AppBootstrap() {
  const [phase, setPhase] = useState<BootPhase>("loading")
  const [App, setApp] = useState<ComponentType | null>(null)

  useEffect(() => {
    if (phase !== "loading") return

    document.body.style.overflow = "hidden"

    let cancelled = false

    ;(async () => {
      await Promise.all([runCriticalPreload(), delay(MIN_LOADER_MS)])
      if (cancelled) return

      const { default: AppComponent } = await import("../App")
      if (cancelled) return

      setApp(() => AppComponent)
      setPhase("ready")
      document.body.style.overflow = ""

      const { preloadDeferredAssets } = await import(
        "../assets/preload/deferredPreload"
      )
      preloadDeferredAssets()
    })()

    return () => {
      cancelled = true
      document.body.style.overflow = ""
    }
  }, [phase])

  return (
    <>
      {phase === "loading" && <LoadingScreen />}
      {App && <App />}
    </>
  )
}
