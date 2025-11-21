//Массив данных
import {termArray} from './Terms.data';
//Стили React
import styles from './Terms.module.sass';
// Картинки
import iconCircle from '../../../../asset/image/icons/icon_cricle.svg'

export const Terms = () => {
    return (
        <div className={styles.termBlock}>
            {termArray.map(item => (
                <div key={item.id}
                    className={styles.termWrapper}>
                    <img src={iconCircle}
                        alt='app-photo'
                        title='app-photo'/>
                    <div className={styles.termContent}>
                        <img src={item.src}
                            alt='app-photo'
                            title='app-photo'/>
                        <h4>
                            {item.title}
                        </h4>
                        <p>
                            {item.paragraph}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

