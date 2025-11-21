//Стили React
import styles from './Section.module.sass';

export const Section = ({children, paddingBottom, background, height}) => {
    return (
        <section className={styles.App_section}
                style={{paddingBottom, background, height}}>
            {children}
        </section>
    );
};

