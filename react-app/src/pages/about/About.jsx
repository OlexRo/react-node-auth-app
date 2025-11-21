//Массив Данных
import {AboutOurTask} from './ui/aboutList/AboutOurTask.data';
import {AboutAudience} from './ui/aboutList/AboutAudience.data';
//Стили
import styles from './About.module.sass'
import style from './ui/aboutList/AboutList.module.sass';
//Компоненты React
import {Section} from '../../component/ui/section/Section';
import {AboutBrief} from './ui/aboutBrief/AboutBrief';
import {AboutList} from './ui/aboutList/AboutList';
import {HeaderBlock} from '../../component/ui/headerBlock/HeaderBlock';

export const About = () => {
    return (
        <div className={styles.aboutWrapper}>
            <HeaderBlock>
                <h5>
                    Главаня - О нас
                </h5>
                <h2>
                    ИНФОРМАЦИЯ О НАШЕМ ПРОЕКТЕ
                </h2>
                <h6>
                    Давайте сотрудничать
                </h6>
            </HeaderBlock>
            {/*Краткое описание*/}
            <Section>
                <div className={styles.aboutContent}>
                    <h3>
                        КРАТКОЕ ОПИСАНИЕ
                    </h3>
                    <AboutBrief/>
                </div>
            </Section>
            {/*Наши задачи*/}
            <Section>
            <div className={styles.aboutContent}>
                    <h3>
                        НАШИ ЗАДАЧИ
                    </h3>
                    <AboutList>
                        {AboutOurTask.map(item=> (
                            <ul key={item.id}>
                                <div className={style.aboutOurTasksBlock}>
                                    <img src={item.img}
                                        alt='photo'
                                        title='photo'/>
                                    <li>
                                        {item.p}
                                    </li>
                                </div>
                            </ul>
                        ))}
                    </AboutList>
                </div>
            </Section>
            {/*Наша целевая аудитория */}
            <Section>
                <div className={styles.aboutContent}>
                    <h3>
                        НАША ЦЕЛЕВАЯ АУДИТОРИЯ
                    </h3>
                    <AboutList>
                        {AboutAudience.map(item => (
                            <ul key={item.id}>
                                <div className={style.aboutOurTasksBlock}>
                                    <img src={item.img}
                                        alt='photo'
                                        title='photo'/>
                                    <li>
                                        {item.p}
                                    </li>
                                </div>
                            </ul>
                        ))}
                    </AboutList>
                </div>
            </Section>
            {/*Наши Контакты */}
            <Section>
                <div className={styles.aboutContent}>
                    <h3>
                        КОНТАКТЫНЕ ДАННЫЕ
                    </h3>
                    <AboutList>
                        <div className={styles.aboutContact}>
                            <ul>
                                <li>
                                    тел. – <strong>8 (914)-(902)-31-98</strong>.
                                </li>
                                <li>
                                    почта – <strong>roman.ales@mail.ru</strong>.
                                </li>
                            </ul>
                        </div>
                    </AboutList>
                </div>
            </Section>
        </div>
    );
};