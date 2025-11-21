import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//Стили React
import styles from './AdminArticle.module.sass';
//Компоненты React
import  {BigArticle} from './../../../article/ui/bigArticle/BigArticle.jsx';
import {CardButton} from '../../../../component/ui/cardButton/CardButton';
//Иконки
import { MdDraw } from 'react-icons/md';
import {FiSearch} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';

export const AdminArticle = () => {
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


    // Удаление статей
    const ArticleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/article/` + id)
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    };

    //Функция поиска
    const [value, setValue] = useState('');
    const filtered = article.filter(art => {
        return art.post_title.toLowerCase().includes(value.toLowerCase())
    })

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
                                <Link to={`/updateArticle/${item.id_post}`}>
                                    <MdDraw
                                        className={styles.allArtStyle}
                                    />
                                </Link>
                                <MdDelete
                                    id='icon_del'
                                    className={styles.allArtStyle}
                                    onClick={() => ArticleDelete(item.id_post)}
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



