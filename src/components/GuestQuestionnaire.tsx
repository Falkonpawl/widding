import React, { useState } from "react"
import { Toast } from "./Toast"
import { ScrollReveal } from "./ScrollReveal"

export function GuestQuestionnaire() {
  // 1. Добавляем состояние для отслеживания процесса отправки
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "validation-error"
  >("idle")
  // Состояние для управления показом тоста
  const [showToast, setShowToast] = useState(false)
  const [errors, setErrors] = useState({ name: false, attendance: false })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get("name") as string
    const attendance = formData.get("attendance")

    const newErrors = {
      name: !name.trim(),
      attendance: !attendance,
    }

    setErrors(newErrors)

    if (newErrors.name || newErrors.attendance) {
      setStatus("validation-error")
      setShowToast(true)
      return // Прерываем выполнение, форма не отправится
    }

    setStatus("loading")
    setShowToast(false)

    const data = {
      name: formData.get("name"),
      withWhom: formData.get("companions") || "Один/Одна",
      attendance: formData.get("attendance") === "yes" ? "Приду" : "Не приду",
    }

    const G_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbzZzLkh93OuVYxHqPYj4uUEzYY7TVTAmx0RPtZ1yCpdqrUBdCu176xh2-kH9hOR891U/exec"

    try {
      // Используем mode: 'no-cors', так как Google Apps Script не поддерживает стандартный CORS
      await fetch(G_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      setStatus("success")
      setShowToast(true)
      form.reset()
    } catch (error) {
      console.error("Ошибка при отправке:", error)
      setStatus("error")
      setShowToast(true)
    }
  }
  const handleInputChange = (fieldName: "name" | "attendance") => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: false, // Сбрасываем ошибку только для этого поля
    }))
  }

  return (
    <section className="invitation__guest-form">
      <p className="invitation__title-text invitation__guest-form-title">
        Анкета гостя
      </p>
      <ScrollReveal as="p" className="invitation__guest-form-intro">
        Пожалуйста, подтвердите своё присутствие до 25 июля, чтобы мы могли
        спланировать нашу свадьбу наилучшим образом.
      </ScrollReveal>
      <ScrollReveal className="invitation__guest-form-fields-wrap" delay={80}>
        <form
          className="invitation__guest-form-fields"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset
            className="invitation__guest-form-group"
            aria-label="Присутствие на торжестве"
          >
            {/* Подсвечиваем заголовок группы радиокнопок при ошибке */}
            <span
              className="invitation__guest-form-label"
              style={errors.attendance ? { color: "#691b26" } : {}}
            >
              Присутствие
            </span>

            <div className="invitation__guest-form-options">
              <label
                className="invitation__guest-form-radio"
                htmlFor="attendance-yes"
              >
                <input
                  id="attendance-yes"
                  type="radio"
                  name="attendance"
                  value="yes"
                  onChange={() => handleInputChange("attendance")}
                />
                <span style={errors.attendance ? { color: "#691b26" } : {}}>
                  Да, с удовольствием приду!
                </span>
              </label>
              <label
                className="invitation__guest-form-radio"
                htmlFor="attendance-no"
              >
                <input
                  id="attendance-no"
                  type="radio"
                  name="attendance"
                  value="no"
                  onChange={() => handleInputChange("attendance")}
                />
                <span style={errors.attendance ? { color: "#691b26" } : {}}>
                  К сожалению, не смогу присутствовать.
                </span>
              </label>
            </div>
          </fieldset>

          <label className="invitation__guest-form-field" htmlFor="guest-name">
            <span
              className="invitation__guest-form-label"
              style={errors.name ? { color: "#691b26" } : {}}
            >
              Ваше имя и фамилия
            </span>
            <input
              id="guest-name"
              className={`invitation__guest-form-input ${errors.name ? "input-error" : ""}`}
              type="text"
              name="name"
              onChange={() => handleInputChange("name")}
            />
          </label>

          <label
            className="invitation__guest-form-field"
            htmlFor="guest-companions"
          >
            <span className="invitation__guest-form-label">
              Вы приходите с любимым человеком, второй половинкой или всей
              семьёй с детьми? Пожалуйста, перечислите имена всех, кто будет с
              вами
            </span>
            <input
              id="guest-companions"
              className="invitation__guest-form-input"
              type="text"
              name="companions"
            />
          </label>

          <button
            type="submit"
            className="invitation__guest-form-submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </ScrollReveal>
      {/* Toast со всеми вариантами сообщений */}
      <div className="toast-container">
        {showToast && (
          <Toast
            message={
              status === "validation-error"
                ? "Заполните поля"
                : status === "success"
                  ? "Ответ успешно отправлен! Ждем вас ✨"
                  : "Ошибка отправки. Попробуйте еще раз."
            }
            type={status === "success" ? "success" : "error"}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </section>
  )
}
