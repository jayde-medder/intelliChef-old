import styles from './Loading.module.css'

export default function Loader() {
  return (
    <div className={styles['loader-container']}>
      <span className={styles['loader']}></span>
    </div>
  )
}
