import styles from './Header.module.css'
import rocket from '../assets/rocket.svg'

const Header = () => {
  return (
    <div className={styles.footer}>
      <img src={rocket} alt="rocket" />
      <h1 className={styles.title}>to<span>do</span></h1>
    </div>
  )
}

export default Header