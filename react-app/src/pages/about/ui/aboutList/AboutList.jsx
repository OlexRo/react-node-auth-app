//Стили
import style from './AboutList.module.sass'

export const AboutList = ({children}) => {
    return (
        <div className={style.aboutOurTasksWrapper}>
            {children}
        </div>
    );
};

