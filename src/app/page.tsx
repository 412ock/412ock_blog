import { Inter } from '@next/font/google'
import styles from './page.module.css'

// components
import Navigation from '../components/Navigation';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navigation/>
      <main className={styles.main}>
        <div className='text-xl font-bold'>
          
        </div>
      </main>
    </>
  )
}
