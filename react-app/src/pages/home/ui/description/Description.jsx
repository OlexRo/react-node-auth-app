//Массив данных
import {DescriptionArray} from './Description.data';
//Стили React
import styles from './Description.module.sass'

export const Description = () => {
    return (
        <>
            {DescriptionArray.map(item => (
                <div key={item.id}
                    className={styles.descriptionItemsWrapper}>
                    <img src={item.src}
                        alt='app-photo'
                        title='app-photo'/>
                    <h4>
                        {item.h4}
                    </h4>
                    <p>
                        {item.text}
                    </p>
                </div>
            ))}
        </>
    );
};

