import styles from './CardButton.module.sass'
import {IoIosMenu} from 'react-icons/io';

export const CardButton = () => {
    return (
        <div className={styles.cardButtonWrapper}>
            <IoIosMenu size={35}/>
            Посмотреть
        </div>
    );
};

