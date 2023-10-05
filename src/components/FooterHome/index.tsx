import { Copyright } from 'lucide-react'
import styles from './styles.module.css'

export default function FooterHome() {
  return (
    <footer className={styles.container}>
      <div className={styles.textGoogle}>
        <Copyright className={styles.svg}/>
        Google 2021
      </div>
      <div>
        version 0.1.0
      </div>
    </footer>
  )
}