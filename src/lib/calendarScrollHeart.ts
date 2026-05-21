import { useCallback, useEffect, useRef, type RefObject } from "react"

export const SCROLL_START_VP = 0.3
export const SCROLL_END_VP = 0.7
const PATH_T_SAMPLES = 200

export const DEFAULT_SCROLL_OFFSETS = {
  startLiftPx: -16,
  startLeftPx: -5,
  endLiftPx: 10,
  endLeftPx: -16,
  endFadeStart: 0.95,
} as const

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

function getLineScrollProgress(
  lineEl: HTMLElement,
  scrollStartVp: number,
  scrollEndVp: number,
): number {
  const vh = window.innerHeight
  const startMark = vh * scrollStartVp
  const endMark = vh * scrollEndVp
  const rect = lineEl.getBoundingClientRect()
  const endTop = endMark - rect.height

  if (rect.top >= startMark) return 0
  if (rect.top <= endTop) return 1

  return (startMark - rect.top) / (startMark - endTop)
}

function applyHeartTransform(heart: HTMLElement, x: number, y: number) {
  heart.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
}

export type UseCalendarScrollHeartOptions = {
  sceneRef: RefObject<HTMLDivElement | null>
  lineRef: RefObject<HTMLDivElement | null>
  pathRef: RefObject<SVGPathElement | null>
  svgRef: RefObject<SVGSVGElement | null>
  heartRef: RefObject<HTMLDivElement | null>
  miniheartRef: RefObject<HTMLDivElement | null>
  startLiftPx?: number
  startLeftPx?: number
  endLiftPx?: number
  endLeftPx?: number
  endFadeStart?: number
  /** 0–1: интерполяция к целевой позиции каждый кадр (плавное движение при скролле) */
  smoothLerp?: number
  scrollStartVp?: number
  scrollEndVp?: number
  /** Постоянное смещение сердца от точки на линии (px) */
  heartOffsetX?: number
  heartOffsetY?: number
  /**
   * Сдвиг старта по вертикали (px, минус = вверх).
   * На прямой линии также добавляется к позиции сердца — иначе при pathStartT=0 не виден эффект.
   */
  startAnchorLiftPx?: number
}

export function useCalendarScrollHeart({
  sceneRef,
  lineRef,
  pathRef,
  svgRef,
  heartRef,
  miniheartRef,
  startLiftPx = DEFAULT_SCROLL_OFFSETS.startLiftPx,
  startLeftPx = DEFAULT_SCROLL_OFFSETS.startLeftPx,
  endLiftPx = DEFAULT_SCROLL_OFFSETS.endLiftPx,
  endLeftPx = DEFAULT_SCROLL_OFFSETS.endLeftPx,
  endFadeStart = DEFAULT_SCROLL_OFFSETS.endFadeStart,
  smoothLerp,
  scrollStartVp = SCROLL_START_VP,
  scrollEndVp = SCROLL_END_VP,
  heartOffsetX = 0,
  heartOffsetY = 0,
  startAnchorLiftPx = 0,
}: UseCalendarScrollHeartOptions) {
  const pathStartTRef = useRef(0)
  const rafRef = useRef(0)
  const smoothLoopRef = useRef(0)
  const targetPosRef = useRef<Point>({ x: 0, y: 0 })
  const currentPosRef = useRef<Point>({ x: 0, y: 0 })
  const smoothInitializedRef = useRef(false)

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
    anchor.y += startLiftPx + startAnchorLiftPx
    pathStartTRef.current = findClosestPathT(path, svg, scene, anchor)
  }, [sceneRef, miniheartRef, pathRef, svgRef, startLiftPx, startAnchorLiftPx])

  const computeTargetPosition = useCallback((): Point | null => {
    const scene = sceneRef.current
    const line = lineRef.current
    const path = pathRef.current
    const svg = svgRef.current
    if (!scene || !line || !path || !svg) return null

    const progress = getLineScrollProgress(line, scrollStartVp, scrollEndVp)
    const startT = pathStartTRef.current
    const pathT = progress <= 0 ? startT : startT + progress * (1 - startT)

    const pos = getPathPointInContainer(path, svg, scene, pathT)
    const startFade = 1 - clamp(progress / 0.05, 0, 1)
    const endFade = clamp(
      (progress - endFadeStart) / (1 - endFadeStart),
      0,
      1,
    )
    return {
      x:
        pos.x +
        startLeftPx * startFade +
        endLeftPx * endFade +
        heartOffsetX,
      y:
        pos.y +
        startLiftPx * startFade +
        endLiftPx * endFade +
        heartOffsetY +
        startAnchorLiftPx,
    }
  }, [
    sceneRef,
    lineRef,
    pathRef,
    svgRef,
    scrollStartVp,
    scrollEndVp,
    startLiftPx,
    startLeftPx,
    endLiftPx,
    endLeftPx,
    endFadeStart,
    heartOffsetX,
    heartOffsetY,
    startAnchorLiftPx,
  ])

  const syncTarget = useCallback(() => {
    const heart = heartRef.current
    const target = computeTargetPosition()
    if (!heart || !target) return

    targetPosRef.current = target

    if (!smoothLerp) {
      currentPosRef.current = target
      applyHeartTransform(heart, target.x, target.y)
      return
    }

    if (!smoothInitializedRef.current) {
      currentPosRef.current = { ...target }
      applyHeartTransform(heart, target.x, target.y)
      smoothInitializedRef.current = true
    }
  }, [heartRef, computeTargetPosition, smoothLerp])

  useEffect(() => {
    refreshPathStartT()
    syncTarget()

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(syncTarget)
    }

    const onResize = () => {
      refreshPathStartT()
      scheduleUpdate()
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", onResize)

    const ro = new ResizeObserver(() => {
      refreshPathStartT()
      scheduleUpdate()
    })
    if (sceneRef.current) ro.observe(sceneRef.current)

    if (smoothLerp && smoothLerp > 0) {
      const tick = () => {
        const heart = heartRef.current
        if (heart) {
          const cur = currentPosRef.current
          const tgt = targetPosRef.current
          const factor = smoothLerp
          cur.x += (tgt.x - cur.x) * factor
          cur.y += (tgt.y - cur.y) * factor
          applyHeartTransform(heart, cur.x, cur.y)
        }
        smoothLoopRef.current = requestAnimationFrame(tick)
      }
      smoothLoopRef.current = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(smoothLoopRef.current)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", onResize)
      ro.disconnect()
    }
  }, [sceneRef, refreshPathStartT, syncTarget, smoothLerp, heartRef])

  return { refreshPathStartT, updateHeart: syncTarget }
}
