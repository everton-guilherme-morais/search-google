import Link from 'next/link'
import Footer from '../components/FooterHome'
import Header from '../components/HeaderHome'
import HomeGoogle from '../components/HomeGoogle'
import styles from './styles.module.css'

const IndexHome = () => (
  <div>
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <HomeGoogle />
      </main>
      <Footer />
    </div>
  </div>
)

export default IndexHome
