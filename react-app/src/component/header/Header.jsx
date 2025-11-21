//Данные
import {headerNavbarArray} from './Header.data'
//Router
import {Link} from 'react-router-dom';
//Стили
import styles from './Header.module.sass';
//Картинки
import Logo from '../../asset/image/logo/Logo.svg';
import LogoMini from '../../asset/image/logo/Logo_mini.svg';

export const Header = ({children}) => {
    return (
        <header className={styles.headerWrapper}>
            {/*Логотип сайта*/}
            <Link to='/'>
                <img
                    className={styles.Logo}
                    src={Logo}
                    alt='Логотип сайта First Humans'
                    title='Логотип сайта First Humans'
                />
                <img
                    className={styles.LogoMini}
                    src={LogoMini}
                    alt='Логотип сайта First Humans'
                    title='Логотип сайта First Humans'
                />
            </Link>
            {/*Навигация сайта*/}
            <div className={styles.headerNavbarWrapper}>
                {headerNavbarArray.map(item => (
                    <Link
                        key={item.id}
                        className={styles.headerNavbar}
                        to={item.href}>
                        {item.text}
                    </Link>
                ))}
            </div>
            {/*Поиск по сайту*/}
            <div className={styles.headerNavigation}>
                {children}
            </div>
        </header>
    );
};

