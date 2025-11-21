import {useEffect, useState} from 'react';
import axios from 'axios';
// Стили
import styles from './ArticleMajor.module.sass';
//Роутер
import {Link} from 'react-router-dom';
import '../../../article/Article'
// Иконки
import { FaBookmark } from 'react-icons/fa';
//Компоненты
import {ButtonMore} from '../../../../component/ui/buttonMore/ButtonMore';
import {CardArticle} from '../../../../component/ui/cardArticle/CardArticle';
import {CardButton} from '../../../../component/ui/cardButton/CardButton.jsx';


export const ArticleMajor = () => {
    //Вывод статей на старницу
    const [articleNew, setArticleNew] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/articleNew`)
            .then((res => {
                    setArticleNew(res.data)
                }
            ))
            .catch((err) => {
                console.log(err)
            });
    }, []);

    const [articleNew2, setArticleNew2] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/articleNew2`)
            .then((res => {
                    setArticleNew2(res.data)
                }
            ))
            .catch((err) => {
                console.log(err)
            });
    }, []);

    //Добавление в закладки
    const addToFavourites = (id_post, User_id_user) => {
        axios.post('http://localhost:5000/addFavourite', { id_post, User_id_user })
            .then(response => alert(response.data.message))
            .catch(error => console.log(error));
    };

    return(
        <div className={styles.articleMajorWrapper}>

            <div className={styles.articleMajorLeftContent}>
                <div className={styles.articleMajorCardTop}>
                    <h3>
                        Наши статьи
                    </h3>
                </div>

                <div className={styles.articleMajorCardBottomWrapper}>
                    {articleNew2.map(item => (
                        <CardArticle key={item.id_post}>
                            <img
                                src={`http://localhost:5000/image/`+item.image_post}
                                alt='app-photo'
                                title='app-photo'
                            />
                            <div className={styles.allArticleIcon}>
                                <h5>
                                    Дата: {item.post_data}
                                </h5>
                                <div className={styles.allArticleIc}>
                                    <FaBookmark
                                        id="icon_del"
                                        className={styles.allArtStyle}
                                        onClick={() => addToFavourites(item.id_post, item.User_id_user)}
                                    />
                                </div>
                            </div>
                            <h4>
                                {item.post_title}
                            </h4>
                            <Link to={`/articlePerson/${item.id_post}`}>
                                <CardButton/>
                            </Link>

                        </CardArticle>
                    ))}
                </div>
            </div>

            <div className={styles.articleMajorRightContent}>
                {articleNew.map(item => (
                        <div key={item.id_post}  className={styles.articleMajorRightCardLittle}>
                            <Link to={`/articlePerson/${item.id_post}`}>
                                <img
                                    src={`http://localhost:5000/image/` + item.image_post}
                                    alt="app-photo"
                                    title="app-photo"
                                />
                            </Link>
                            <div className={styles.articleMajorRightContentName}>
                                <h4>
                                    {item.post_title}
                                </h4>
                                <p>
                                    {item.post_preface}
                                </p>
                            </div>
                            <div className={styles.allArticleIc}>
                                <FaBookmark
                                    id="icon_del"
                                    className={styles.allArtStyle}
                                    onClick={() => addToFavourites(item.id_post, item.User_id_user)}
                                />
                            </div>
                        </div>
                ))}
                <Link to='/article'>
                    <ButtonMore/>
                </Link>
            </div>
        </div>
    );
};