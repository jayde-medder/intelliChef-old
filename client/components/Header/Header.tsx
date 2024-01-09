import styles from './Header.module.css'

import { RecipesIcon, LoginIcon } from '../Icons.tsx'

function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.content}>
          <div className={styles['img-wrapper']}>
            <img src="/images/logo1.png" alt="intelliChef logo"></img>
          </div>
          <div className={styles['icons-container']}>
            <div className={styles.icon}>
              <RecipesIcon />
              <span className={styles['tooltip-text']}>Saved Recipes</span>
            </div>
            <div className={styles.icon}>
              <LoginIcon />
              <span className={styles['tooltip-text']}>Log In</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
