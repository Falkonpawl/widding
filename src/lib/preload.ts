export const DESKTOP_MIN_WIDTH = 1024

export function isDesktopViewport(): boolean {
  return window.innerWidth >= DESKTOP_MIN_WIDTH
}

export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => {
      console.warn("[preload] failed:", url)
      resolve()
    }
    img.src = url
  })
}

export function preloadImages(urls: string[]): Promise<void> {
  if (urls.length === 0) return Promise.resolve()
  return Promise.all(urls.map(preloadImage)).then(() => undefined)
}

export async function preloadWeddingFonts(): Promise<void> {
  const loads = [
    document.fonts.load('400 16px "CharterITC"'),
    document.fonts.load('400 italic 16px "Caslon Becker No540 Swash [Rus"'),
  ]
  await Promise.allSettled(loads)
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
