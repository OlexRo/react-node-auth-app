//Стили
import styles from './CardArticle.module.sass';

export const CardArticle = ({children}) => {
    return (
        <div className={styles.cardArticleWrapper}>
            <div className={styles.cardArticleContent}>
                {children}
            </div>
        </div>
    );
};

