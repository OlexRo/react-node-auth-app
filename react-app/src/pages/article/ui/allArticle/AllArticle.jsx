import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//Стили React
import styles from './AllArticle.module.sass';
//Компоненты React
import {BigArticle} from '../bigArticle/BigArticle';
import {CardButton} from '../../../../component/ui/cardButton/CardButton';
//Иконки
import {FiSearch} from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';

export const AllArticle = () => {
    //Вывод статей на старницу
    const [article, setArticle] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/article`)
            .then((res => {
                    setArticle(res.data)
                }
            ))
            .catch((err) => {
                console.log(err)
            });
    }, []);

    //Функция поиска
    const [value, setValue] = useState('');
    const filtered = article.filter(art => {
        return art.post_title.toLowerCase().includes(value.toLowerCase())
    })

    //Добавление в закладки
    const addToFavourites = (id_post, User_id_user) => {
        axios.post('http://localhost:5000/addFavourite', { id_post, User_id_user })
            .then(response => alert(response.data.message))
            .catch(error => console.log(error));
    };

    return (
        <div className={styles.allArticleWrapper}>
            {/*Поиск по статьям*/}
            <div className={styles.headerNavigation}>
                <div className={styles.headerSearchWrapper}>
                    <label htmlFor='searchId'></label>
                    <input
                        type='text'
                        placeholder='Поиск по статьям'
                        id='searchId'
                        className={styles.headerSearch}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <FiSearch className={styles.headerSearchIcon}/>
                </div>
            </div>
            {filtered.map(item => (
                <BigArticle key={item.id_post}>
                    <img
                        src={`http://localhost:5000/image/`+item.image_post}
                        alt='app-photo'
                        title='app-photo'/>
                    <div>
                        <div className={styles.allArticleIcon}>
                            <h5>
                                Дата: {item.post_data}
                            </h5>
                            <div className={styles.allArticleIc}>
                                <FaBookmark
                                    id='icon_del'
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
                    </div>
                </BigArticle>
            ))}
        </div>
    );
};



