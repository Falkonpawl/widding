import React, { useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000) // Пропадает через 4 секунды

    return () => clearTimeout(timer)
  }, [onClose])

  return <div className={`toast toast--${type}`}>{message}</div>
}
