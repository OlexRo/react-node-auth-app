//Стили React
import styles from './Buttton.module.sass';

export const Button = ({children,
                        background,
                        border,
                        width,
                        height,
                        onClick,
                        color,
                        fontWeight,
                        disabled,
                        }) => {
    return (
        <button
            className={styles.App_button}
            onClick={onClick}
            disabled={disabled}
            style={{background, border, width, height, color, fontWeight}}
        >
            {children}
        </button>
    );
};
