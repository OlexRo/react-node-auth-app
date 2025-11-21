//Стили React
import styles from './HeaderBlock.module.sass'

export const HeaderBlock = ({children}) => {
    return (
        <div className={styles.articleHeader}>
            <div className={styles.articleHeaderInside}>
                {children}
            </div>
        </div>
    );
};
