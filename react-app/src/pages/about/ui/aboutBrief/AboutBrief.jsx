//Стили
import style from './AboutBrief.module.sass'

export const AboutBrief = () => {
    return (
        <div className={style.aboutBriefWrapper}>
            <p>
                <strong>“First Humans”</strong> – веб-приложение цель которого,
                роедостаивть удобный и доступный инструмент для
                изучения истории древних народов.
            </p>
            <p>
                Мы появилсь в сети – <strong>2024 год</strong>.
            </p>
        </div>
    );
};

