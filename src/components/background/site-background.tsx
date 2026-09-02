import styles from "./site-background.module.css";

export function SiteBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.field} />
      <div className={`${styles.band} ${styles.bandOne}`} />
      <div className={`${styles.band} ${styles.bandTwo}`} />
      <div className={`${styles.band} ${styles.bandThree}`} />
      <div className={styles.grid} />
      <div className={styles.vignette} />
    </div>
  );
}
