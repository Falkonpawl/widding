const SCROLL_LOCK_CLASS = "scroll-locked"

export function lockPageScroll(): void {
  document.body.classList.add(SCROLL_LOCK_CLASS)
}

export function unlockPageScroll(): void {
  document.body.classList.remove(SCROLL_LOCK_CLASS)
}
