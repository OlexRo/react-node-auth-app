//Массив Данных
import {FooterLinkArray} from './Footer.date';
import {FooterIconArray} from './Footer.date';
//React Роутер
import {Link} from 'react-router-dom';
//Стили React
import styles from './Footer.module.sass'
//Компонены React
import {QrCode} from './ui/qr_code/QRCode';
//Картинки
import Logo from '../../asset/image/logo/Logo.svg';

export const Footer = () => {
    return (
        <div className={styles.footerWrapper}>
            {/*Навигация Сайта*/}
            <div className={styles.footerTopContent}>
                <div className={styles.footerLayout}>
                    <div className={styles.footerLayoutTitle}>
                        Навигация сайта
                    </div>
                    {FooterLinkArray.map(item => (
                        <Link
                            key={item.id}
                            className={styles.footerLayoutLink}
                            to={item.href}>
                            {item.text}
                        </Link>
                    ))}
                </div>
                {/*Ссылки на соц-сети*/}
                <QrCode/>
                {/*Ссылки на соц-сети для мобильной версии*/}
                <div className={styles.footerIcon}>
                    {FooterIconArray.map(item => (
                        <Link
                            key={item.id}
                            className={styles.footerLayoutLink}
                            to={item.href}
                        >
                            {<item.icon
                                className={styles.footerIconMargin}
                                size='40px'
                            />}
                        </Link>
                    ))}
                </div>
            </div>
            {/*Логотип сайта*/}
            <div className={styles.footerBottomContent}>
                <Link to='/'>
                    <img
                        className={styles.footerBottomLogo}
                        src={Logo}
                        alt='logo'
                        title='logo'
                    />
                </Link>
                <span className={styles.AppFooterCopyRight}>
                    Copyright © 2023 First Human
                </span>
            </div>
        </div>
    );
};
