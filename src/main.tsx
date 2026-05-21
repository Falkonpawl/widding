import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import weddingDisplayFontUrl from './assets/fonts/caslonbeckerno540swashrus_italic.otf?url'
import weddingChapterFontUrl from './assets/fonts/Charter ITC.ttf?url'
import './index.css'
import { AppBootstrap } from './bootstrap/AppBootstrap'

const WEDDING_FONT_STYLE_ID = 'wedding-font-faces'

function injectWeddingFontFaces() {
  document.getElementById(WEDDING_FONT_STYLE_ID)?.remove()

  const style = document.createElement('style')
  style.id = WEDDING_FONT_STYLE_ID
  style.textContent = `
@font-face {
  font-family: 'Caslon Becker No540 Swash [Rus';
  src: url(${JSON.stringify(weddingDisplayFontUrl)}) format('opentype');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'CharterITC';
  src: url(${JSON.stringify(weddingChapterFontUrl)}) format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`
  document.head.appendChild(style)
}

injectWeddingFontFaces()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppBootstrap />
  </StrictMode>,
)
