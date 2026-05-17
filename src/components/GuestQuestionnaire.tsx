import { type FormEvent } from "react"

export function GuestQuestionnaire() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: отправка ответов
  }

  return (
    <section className="invitation__guest-form">
      <p className="invitation__title-text invitation__guest-form-title">
        Анкета гостя
      </p>
      <p className="invitation__guest-form-intro">
        Пожалуйста, подтвердите своё присутствие до 1 августа, чтобы мы могли
        спланировать нашу свадьбу наилучшим образом.
      </p>
      <form
        className="invitation__guest-form-fields"
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset
          className="invitation__guest-form-group"
          aria-label="Присутствие на торжестве"
        >
          <div className="invitation__guest-form-options">
            <label className="invitation__guest-form-radio" htmlFor="attendance-yes">
              <input
                id="attendance-yes"
                type="radio"
                name="attendance"
                value="yes"
              />
              <span>Да, с удовольствием приду!</span>
            </label>
            <label className="invitation__guest-form-radio" htmlFor="attendance-no">
              <input
                id="attendance-no"
                type="radio"
                name="attendance"
                value="no"
              />
              <span>К сожалению, не смогу присутствовать.</span>
            </label>
          </div>
        </fieldset>

        <label className="invitation__guest-form-field" htmlFor="guest-name">
          <span className="invitation__guest-form-label">Ваше имя и фамилия</span>
          <input
            id="guest-name"
            className="invitation__guest-form-input"
            type="text"
            name="name"
            autoComplete="name"
          />
        </label>

        <label className="invitation__guest-form-field" htmlFor="guest-companions">
          <span className="invitation__guest-form-label">
            Если вы будете с парой или семьёй, пожалуйста, внесите все имена
          </span>
          <input
            id="guest-companions"
            className="invitation__guest-form-input"
            type="text"
            name="companions"
          />
        </label>

        <button type="submit" className="invitation__guest-form-submit">
          Отправить
        </button>
      </form>
    </section>
  )
}
