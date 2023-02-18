import Link from 'next/link';
import style from '@/styles/common/navigation.module.css';

export default function Navigation() {
    return (
        <nav>
            <div className={style.navbarWrapper}>
                <div className={`${style.container}`}>
                    <Link className={style.logo} href='/'>412ock' Blog</Link>
                </div>
                <ul className={style.navGroup}>
                    <li className={style.navItem}><Link  href='/about'>About</Link></li>
                    <li className={style.navItem}><Link  href='/posts'>Blog</Link></li>
                </ul>
            </div>
        </nav>
    )
}