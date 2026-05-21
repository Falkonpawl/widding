import topEnvelopeUrl from "../envelope/photoo2.png.webp?url"
import bottomEnvelopeUrl from "../envelope/photoo2p.png.webp?url"
import pressUrl from "../envelope/press.png?url"
import backgroundUrl from "../background.webp?url"
import goldenFlowersTopUrl from "../1/GOLDEN flowers.png?url"
import goldenStrokeTopUrl from "../1/GOLDEN STROKE 1.png?url"
import goldenFlowersBottomUrl from "../1/GOLDEN LINE 2.png?url"
import goldenStrokeBottomUrl from "../1/GOLDEN png.png?url"
import heartUrl from "../1/Heart.png?url"
import {
  isDesktopViewport,
  preloadImages,
  preloadWeddingFonts,
} from "../../lib/preload"

const PHASE2_URLS = [topEnvelopeUrl, bottomEnvelopeUrl, pressUrl]

function getPhase3Urls(): string[] {
  const urls = [
    backgroundUrl,
    goldenFlowersTopUrl,
    goldenStrokeTopUrl,
    heartUrl,
  ]
  if (isDesktopViewport()) {
    urls.push(goldenFlowersBottomUrl, goldenStrokeBottomUrl)
  }
  return urls
}

export async function runCriticalPreload(): Promise<void> {
  await preloadImages(PHASE2_URLS)
  await Promise.all([preloadImages(getPhase3Urls()), preloadWeddingFonts()])
}
