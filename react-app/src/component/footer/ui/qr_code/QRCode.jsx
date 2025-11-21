//React Роутер
import {Link} from "react-router-dom";
//Массив Данных
import {QrCodeArray} from './QRCode.data';
//Стили React
import styles from './QRCode.module.sass';
export const QrCode = () => {
    return (
        <div className={styles.footerQrCodeWrapper}>
            {/*Qr-Коды для соц-сетей*/}
            {QrCodeArray.map(item => (
                <div
                    key={item.id}
                    className={styles.footerQrCode}
                >
                    <div className={styles.footerQrCodeIcon}>
                        <Link to={item.href}>
                            {<item.icon
                                size='30px'
                                fill='black'/>}
                        </Link>
                    </div>
                    <img
                        className={styles.footerQrCodePhoto}
                        src={item.img}
                        alt='app-qr-icon'
                        title='app-qr-icon'
                    />
                    <span className={styles.footerQrCodeNickname}>
                        {item.nickName}
                    </span>
                </div>))}
        </div>
    );
};
