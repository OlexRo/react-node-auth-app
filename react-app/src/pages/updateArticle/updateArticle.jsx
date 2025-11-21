import axios from 'axios';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';
//Стили React
import styles from './updateArticle.module.sass';
//Компоненнты
import {Section} from '../../component/ui/section/Section';
import {HeaderBlock} from '../../component/ui/headerBlock/HeaderBlock';
import {Button} from '../../component/ui/button/Button.jsx';

export const UpdateArticle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const articleID = location.pathname.split('/')[2]

    //Сбор данных
    const[articleInput, setArticleInput] = useState({
        post_preface: '',
        post_title: '',
        post_subtitle: '',
        user_text: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticleInput(prev => ({ ...prev, [name]: value }));
    };

    //Функция обновления статьи
    const handleClick = (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:5000/article/${articleID}`, articleInput)
                .then(res => console.log(res))
            navigate('/article');
            // window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
    };

    console.log(name)

    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/articlePerson/${id}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <div className={styles.createArticleWrapper}>
            <HeaderBlock>
                <h5 style={{width: '320px'}}>
                    Статьи - Редактирование статьи
                </h5>
                <h2>
                    РЕДАКТИРОВАНИЕ СТАТЬИ ДЛЯ САЙТА
                </h2>
                <h6>
                    Исправление ошибок
                </h6>
            </HeaderBlock>
            <Section>
                <div className={styles.createArticlePrefaceWrapper}>
                    <h3>
                        СТАТЬЯ ДЛЯ РЕДАКТИРОВАНИЯ
                    </h3>
                    {data.map(item => (
                        <div key={item.id_post}>
                            {/*Предисловие */}
                            <div className={styles.createArticlePreface}>
                                <label
                                    htmlFor="prefaceID"
                                    className={styles.createArticlePrefaceLabel}>
                                    Предисловие
                                </label>
                                <div className={styles.createArticlePrefaceBottom}>
                                    <textarea
                                        id="prefaceID"
                                        placeholder="Введите исправление"
                                        onChange={handleInputChange}
                                        required
                                        defaultValue={item.post_preface}
                                        name="post_preface"
                                        maxLength="500"
                                    />
                                    <span className={styles.createArticleDescription}>
                                        * Место для исправления ошибок
                                    </span>
                                </div>
                            </div>

                            {/*Заголовок */}
                            <div className={styles.createArticlePreface}>
                                <label
                                    htmlFor="post_title"
                                    className={styles.createArticlePrefaceLabel}>
                                    Заголовок
                                </label>
                                <div className={styles.createArticlePrefaceBottom}>
                                    <textarea
                                        id="prefaceID"
                                        placeholder="Введите исправление"
                                        onChange={handleInputChange}
                                        required
                                        name="post_title"
                                        defaultValue={item.post_title}
                                        maxLength="100"
                                    />
                                    <span className={styles.createArticleDescription}>
                                        * Место для исправления ошибок
                                    </span>
                                </div>
                            </div>

                            {/*Подзаголовок */}
                            <div className={styles.createArticlePreface}>
                                <label
                                    htmlFor="post_subtitle"
                                    className={styles.createArticlePrefaceLabel}>
                                    Подзаголовок
                                </label>
                                <div className={styles.createArticlePrefaceBottom}>
                                    <textarea
                                        id="prefaceID"
                                        placeholder="Введите исправление"
                                        onChange={handleInputChange}
                                        required
                                        defaultValue={item.post_subtitle}
                                        name="post_subtitle"
                                        maxLength="500"
                                    />
                                    <span className={styles.createArticleDescription}>
                                        * Место для исправления ошибок
                                    </span>
                                </div>
                            </div>
                            <div className={styles.createArticleTextWrapper}>
                                <span className={styles.createArticleDescription}>
                                        * Место для исправления ошибок
                                </span>
                                <textarea
                                    placeholder="Введите исправление"
                                    name="user_text"
                                    defaultValue={item.user_text}
                                    onChange={handleInputChange}
                                />
                                <Button width={150}
                                        onClick={handleClick}
                                >
                                    Добавить
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};