import styles from './Header.module.css'

import { RecipesIcon, LoginIcon } from '../Icons.tsx'
import Login from './Login.tsx'
import { Link } from 'react-router-dom'
import { FaBook } from 'react-icons/fa'

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <Link to="/" className={styles['img-wrapper']}>
          <img src="/images/logo1.png" alt="intelliChef logo"></img>
        </Link>
        <div className={styles['icons-container']}>
          <Link to="ManageMyRecipes" className={styles.icon}>
            <FaBook size={30} fill="var(--gunmetal)" />
            <span className={styles['tooltip-text']}>Saved Recipes</span>
          </Link>
          <button className={styles.icon}>
            <Login />
            <span className={styles['tooltip-text']}>Log In</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
