import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
//Стили
import styles from './articlePerson.module.sass'
//компоенты
import {Section} from '../../component/ui/section/Section';

export const ArticlePerson = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    //Вывод страниц с описанием статей
    useEffect(() => {
        axios.get(`http://localhost:5000/articlePerson/${id}`)
            .then(res =>
                setProduct(res.data)
            )
            .catch(error =>
                console.log(error)
            );
    }, [id]);

    return (
        <Section>
            {product.map(item => (
                <div className={styles.ArticlePersonWrapper} key={item.id_post}>
                    <div className={styles.ArticlePersonHeader}>
                        <h5>Атворская статья</h5>
                        <span>{item.post_data}</span>
                    </div>
                    <div className={styles.ArticlePersonQuote}>"{item.post_preface}"</div>
                    <div className={styles.ArticlePersonTitle}>
                        <h1>{item.post_title}</h1>
                    </div>
                    <div className={styles.ArticlePersonSubtitle}>
                        Выживает не сильнейший из видов, но тот, что лучше
                        прочих приспосабливается к изменяющейся среде
                        Выживает не сильнейший из видов, но тот.
                    </div>
                    <div className={styles.ArticlePersonAuthorArticle}>
                        <span>
                            Автор статьи: <span className={styles.ArticlePersonAuthor}>{item.post_author}</span>
                        </span>
                    </div>
                    <div className={styles.ArticlePersonAuthorText}>
                        <h4>{item.post_subtitle}</h4>
                        <p>{item.user_text}</p>
                    </div>
                </div>
            ))}
        </Section>
    );
};