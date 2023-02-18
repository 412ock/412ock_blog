import styles from './page.module.css'

// components
import Notice from '@/components/common/Notice';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.container}>
          <Notice>
            <p>😢 Sorry, Main Page is on Working.</p>
            <p>You should go to Blog Section!</p>
            <p>Thank you.</p>
          </Notice>
        </section>
      </main>
    </>
  )
}

