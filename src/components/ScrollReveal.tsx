import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react"

type ScrollRevealTag = "div" | "li" | "p" | "a" | "section" | "form"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ScrollRevealTag
  style?: CSSProperties
} & Omit<HTMLAttributes<HTMLElement>, "className" | "style" | "children">

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  style,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const revealClass = visible ? " scroll-reveal--visible" : ""
  const mergedClassName = `scroll-reveal${revealClass}${className ? ` ${className}` : ""}`

  return createElement(
    Tag,
    {
      ...rest,
      ref,
      className: mergedClassName,
      style: { ...style, transitionDelay: `${delay}ms` },
    },
    children,
  )
}
