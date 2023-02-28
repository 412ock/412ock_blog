import Link from 'next/link';
import style from '@/styles/common/navigation.module.css';

export default function Navigation() {
    return (
        <nav>
            <div className={style.navbarWrapper}>
                <div className={`${style.container}`}>
                    <Link className={style.logo} href={`/`}>412ock&apos; Blog</Link>    
                    <ul className={style.navGroup}>
                        <Link  href={`/about`}><li className={style.navItem}>About</li></Link>
                        <Link  href={`/posts`}><li className={style.navItem}>Blog</li></Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}