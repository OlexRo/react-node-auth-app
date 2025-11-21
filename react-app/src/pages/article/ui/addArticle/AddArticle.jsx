import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
//Стили React
import './AddArticele.sass';
//Компоненты React
import {BigArticle} from '../bigArticle/BigArticle';
import {CardButton} from '../../../../component/ui/cardButton/CardButton';
import styles from '../allArticle/AllArticle.module.sass';

export const AddArticle = ({ children, path }) => {

    const navigate = useNavigate();

    const Login = (e) => {
        e.preventDefault();
        try {
            axios.get('http://localhost:5000/')
                .then(res => {
                    if(res.data.user_role === "Администратор" || res.data.user_role === "Пользователь") {
                        navigate('/createArticle');
                    }
                    else{
                        alert('Чтобы создать свою статью, нужно зарегистрироваться')
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <BigArticle border='2px dotted rgba(119, 119, 119)'
                    boxShadow='none'
                    onClick={Login}
        >
            <div className='addArticleCover'>
                ОБЛОЖКА СТАТЬИ
            </div>
            <div>
                <div className={styles.allArticleIcon}>
                    <h5>
                        Дата публикации
                    </h5>
                </div>
                <h4>
                    ЗАГОЛОВОК
                </h4>
                <CardButton/>
            </div>
        </BigArticle>
    );
};

