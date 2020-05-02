import Link from 'next/link';
import styles from './styles.module.scss';

const Nav = () => {
  return (
    <div className={styles.nav}>
      <Link href="/"><a className={styles.navItem}>Home</a></Link>
      <Link href="/about"><a className={styles.navItem}>About</a></Link>
      <Link href="/"><a className={styles.navItem}>Home</a></Link>
    </div>
  )
}

export default Nav;