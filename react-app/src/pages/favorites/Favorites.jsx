import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//Стили React
import styles from './favorites.module.sass'
//Компоненты React
import {BigArticle} from '../article/ui/bigArticle/BigArticle.jsx';
import {CardButton} from '../../component/ui/cardButton/CardButton.jsx';
//Икноки React
import {MdDelete} from 'react-icons/md';
import {FiSearch} from 'react-icons/fi';

export const Favorites = () => {
    const [favouriteArticles, setFavouriteArticles] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/favouriteArticles')
            .then(response => setFavouriteArticles(response.data))
            .catch(error => console.log(error));
    }, []);

    // Удаление пользоватлей
    const UsersDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/favouriteArticles/` + id)
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    };

    //Функция поиска
    const [value, setValue] = useState('');
    const filtered = favouriteArticles.filter(art => {
        return art.post_title.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <div className={styles.FavoritesWrapper}>
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

            <h2>Ваши избранные статьи</h2>
            <div id='favoritesID'>
                {filtered.map(item => (
                    <BigArticle key={item.id_post_favorites}>
                        <img
                            src={`http://localhost:5000/image/`+item.image_post}
                            alt='app-photo'
                            title='app-photo'/>
                        <div>
                            <div className={styles.allArticleIcon}>
                                <h5>
                                    Дата: {item.post_data}
                                </h5>
                                <MdDelete
                                    id='icon_del'
                                    className={styles.allArtStyle}
                                    onClick={() => UsersDelete(item.id_post)}
                                />
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
        </div>
    );
};


