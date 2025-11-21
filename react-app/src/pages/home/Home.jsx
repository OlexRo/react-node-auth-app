//Массив данных
import {peopleArray} from './Home.data';
//React Роутер
import {Link} from 'react-router-dom';
//Стили React
import styles from './Home.module.sass'
//Компоненты React
import {Button} from '../../component/ui/button/Button';
import {Section} from '../../component/ui/section/Section';
import {Terms} from './ui/terms/Terms';
import {Description} from './ui/description/Description';
import {ArticleMajor} from './ui/articleMajor/ArticleMajor';
//Картинки
import introductoryPhoto from '../../asset/image/homePhoto/introductoryPhoto.png';
import descriptionPhoto from '../../asset/image/homePhoto/descriptionPhoto/descriptionPhoto.svg';
import aboutMigrationPhoto from '../../asset/image/homePhoto/abootMigrationPhoto.svg'
import {useEffect, useState} from 'react';

export const Home = () => {
    const [secondDeg, setSecondDeg] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setSecondDeg(6 * date.getSeconds());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            {/*Вступительный контент*/}
            <section className={styles.homeIntroductoryWrapper}>
                <div className={styles.homeIntroductoryLeftContent}>
                    <img
                        src={introductoryPhoto}
                        alt='app-photo'
                        title='app-photo'/>
                </div>
                <div className={styles.homeIntroductoryRightContent}>
                    <h1>
                        Age of the first humans:
                    </h1>
                    <h2>
                        from the beginning of the present
                    </h2>
                    <p>
                        Выживает не сильнейший из видов, но тот, что лучше прочих
                        приспосабливается к изменяющейся среде
                    </p>
                    <div className={styles.homeIntroductoryButtons}>
                        <Link to='/article'>
                            <Button width='250px'
                                    height='55px'
                                    background='black'
                                    color='white'
                                    border='1px solid white'>
                                СМОТРЕТЬ СТАТЬИ
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className={styles.homeIntroductoryPeopleWrapper}>
                <div className={styles.homeIntroductoryPeople}>
                    {peopleArray.map(item => (
                        <span
                            className={styles.homeIntroductoryPeopleTitles}
                            key={item.id}>
                            {item.name}
                        </span>
                    ))}
                </div>
            </section>
            {/*Описание терминов*/}
            <Section>
                <Terms/>
            </Section>
            {/*Описание сайта по пунктам*/}
            <Section>
                <div className={styles.descriptionWrapper}>
                    <div className={styles.descriptionLeftContent}>
                        <img
                            src={descriptionPhoto}
                            alt='app-photo'
                            title='app-photo'/>
                    </div>
                    <div className={styles.descriptionRightContent}>
                        <h3>
                            УНИКАЛЬНАЯ ВОЗМОЖНОСТЬ ПРОЙТИ ВЕСЬ ПУТЬ С НАЧАЛА
                        </h3>
                        <p>
                            Выживает не сильнейший из видов, но тот, что лучше прочих
                            приспосабливается к изменяющейся среде
                        </p>
                        <div className={styles.descriptionRightContentItems}>
                            <Description/>
                        </div>
                    </div>
                </div>
            </Section>
            {/*Определение Миграции*/}
            <Section>
                <div className={styles.aboutMigrationWrapper}>
                    <div className={styles.aboutMigrationLeftContent}>
                        <h3>
                            ЧТО ТАКОЕ МИГРАЦИИ ДРЕВИХ ЛЮДЕЙ
                        </h3>
                        <p>
                            Миграция древних людей - это процесс переселения
                            и перемещения древних человеческих обществ на новые
                            территории. Это происходило в результате различных
                            факторов, таких как изменение климата, перенаселение,
                            поиск новых источников пищи или воды
                        </p>
                    </div>
                    <div className={styles.aboutMigrationRightContent}>
                        <div className={styles.clock}>
                            <span className={styles.hourhand}/>
                            <span className={styles.minutehand} />
                            <span className={styles.secondhand} style={{transform: `rotate(${secondDeg}deg)`}}/>
                        </div>
                        <img
                            src={aboutMigrationPhoto}
                            alt="app-photo"
                            title="app-photo"/>
                    </div>
                </div>
            </Section>
            <Section>
                <h3>
                    НАШИ СТАТЬИ
                </h3>
                <ArticleMajor/>
            </Section>
        </main>
    );
};