import Link from 'next/link';
import style from '../styles/navigation.module.css';

export default function Navigation() {
    return (
        <nav>
            <div className={style.navbarWrapper}>
                <div className={`${style.logoWrapper} ${style.container}`}>
                    <Link href=''><h1 className={style.logo}>412ock' Blog</h1></Link>
                </div>
                <ul>
                    <Link href=''>
                        <li className={style.navItem}>Blog</li>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}