import styles from './page.module.css'

// components
import Main from '@/components/Main';
import Notice from '@/components/common/Notice';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section>
          <Main/>
        </section>
      </main>
    </>
  )
}

