//Стили
import styles from './Article.module.sass';
//Компоненты React
import {Section} from '../../component/ui/section/Section';
import {NewArticle} from './ui/newArticle/NewArticle';
import {HeaderBlock} from '../../component/ui/headerBlock/HeaderBlock';
import {AllArticle} from './ui/allArticle/AllArticle';
import {AddArticle} from './ui/addArticle/AddArticle';
//Картинки
import './../../asset/image/articlePhoto/articleMainPhoto.png';

export const Article = () => {
    return (
        <div className={styles.articleWrapper}>
            {/*Верхняя часть сайта с названием статьи */}
            <HeaderBlock>
                <h5>
                    Главная - Статьи
                </h5>
                <h2>
                    ОБСУЖДЕНИЯ И ИССЛЕДОВАНИЯ
                </h2>
                <h6>
                    Читайте и пишите
                </h6>
            </HeaderBlock>
            {/*Новые статьи*/}
            <Section>
                <div className={styles.articleContent}>
                    <h3>
                        НОВЫЕ СТАТЬИ
                    </h3>
                    <NewArticle/>
                </div>
            </Section>
            {/*Добовление статьи*/}

            <Section id='createArticle'>
                <div className={styles.articleContent}>
                    <h3>
                        ДОБАВИТЬ СВОЮ СТАТЬЮ
                    </h3>
                    <AddArticle/>
                </div>
            </Section>

            {/*Все статьи*/}
            <Section>
                <div className={styles.articleContent}>
                    <h3>
                        ВСЕ СТАТЬИ
                    </h3>
                    <AllArticle/>
                </div>
            </Section>
        </div>
    );
};
