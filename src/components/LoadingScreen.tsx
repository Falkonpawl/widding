import loadingSvg from "../assets/loading.svg"
import styles from "./LoadingScreen.module.css"

export function LoadingScreen() {
  return (
    <div className={styles.overlay} aria-busy="true" aria-label="Загрузка">
      <img className={styles.spinner} src={loadingSvg} alt="" />
    </div>
  )
}
