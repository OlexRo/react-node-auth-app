import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
//React массив
import {createArticlePrefaceArray} from './createArticle.data.js';
//Стили React
import styles from './createArticle.module.sass';
//Компоненты React
import {Section} from '../../component/ui/section/Section';
import {HeaderBlock} from '../../component/ui/headerBlock/HeaderBlock';
import {Button} from '../../component/ui/button/Button.jsx';
import {Modal} from '../../component/ui/modal/Modal.jsx';
//Иконки
import { FaArrowDown } from "react-icons/fa";

export const CreateArticle = () => {
    const navigate = useNavigate();
    const[article, setArticle] = useState({
        post_preface: '',
        post_title: '',
        post_subtitle: '',
        user_text: '',
        post_photo: ''
    });

    //Сбор данных из input
    const [allFieldsFilled, setAllFieldsFilled] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticle(prev => ({ ...prev, [name]: value }));
    };

    //Отправка данных из input в бд
    const handleClick = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:5000/article', article)
            modalFun();
        }
        catch (err) {
            console.log(err);
        }
    };

    //Кнопка для добавления фото и отпрвки на страницу со статьями
    const[file, setFile] = useState();
    const[modalActive, setModalActive] = React.useState(false);

    //Модальное окно для добавление фото
    function modalFun() {
        setModalActive(true);
        const isAllFilled = Object.values(article).every(val => val.trim() !== '');
        setAllFieldsFilled(isAllFilled);
    }

    //Функция для добавление фото
    const upload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('http://localhost:5000/upload', formData);
            console.log(res);
            alert('Фотография добавлена')
        } catch (err) {
            console.log(err);
        }
        navigate('/article');
        location.reload();
    };

    return (
        <div className={styles.createArticleWrapper}>
            {/*Модальное окно для добавления фото*/}
            <Modal
                active={modalActive}
                setActive={setModalActive}
            >
                <div className={styles.createArticleModal}>
                    <h3>ДОБАВЛЕНИЕ ФОТО</h3>
                    <div className={styles.input_wrapper}>
                        <input
                            type='file'
                            name='file'
                            id='file'
                            accept='image/*'
                            className={styles.input_file}
                            onChange={(e) =>
                                setFile(e.target.files[0])}
                        />
                        <label
                            htmlFor='file'
                            className={styles.input_file_button}
                        >
                            <span className={styles.createArticleImage}>
                                <FaArrowDown
                                    size='35'
                                    color='white'
                                />
                            </span>
                            <span className={styles.createArticleButton}>Выберите файл</span>
                        </label>
                    </div>
                    <Button
                        width='200px'
                        onClick={upload}
                        className={styles.createArticleUpoload}
                    >
                        Добавить Фото
                    </Button>
                </div>
            </Modal>
            {/*прослойка*/}
            <HeaderBlock>
                <h5 style={{width: '280px'}}>
                    Статьи - Добавление статьи
                </h5>
                <h2>
                    ДОБАВЛЕНИЕ ВАШЕЙ СТАТЬИ НА САЙТ
                </h2>
                <h6>
                    Поделитесь своим знанием
                </h6>
            </HeaderBlock>
            <Section>
            <div className={styles.createArticlePrefaceWrapper}>
                    <h3>
                        ВАША СТАТЬЯ
                    </h3>
                    {createArticlePrefaceArray.map(item => (
                        <div
                            className={styles.createArticlePreface}
                            key={item.id}>
                            <label
                                htmlFor='prefaceID'
                                className={styles.createArticlePrefaceLabel}>
                                {item.label}
                            </label>
                            <div className={styles.createArticlePrefaceBottom}>
                        <textarea
                            id='prefaceID'
                            placeholder={item.placeholder}
                            onChange={handleInputChange}
                            required
                            name={item.name}
                            maxLength={item.maxlength}
                        />
                        <span className={styles.createArticleDescription}>
                            {item.span}
                        </span>
                            </div>
                        </div>
                    ))}
                    <div className={styles.createArticleTextWrapper}>
                        <textarea
                            placeholder='Напишите вашу статью'
                            name='user_text'
                            onChange={handleInputChange}
                        />
                        <Button
                            width={150}
                            onClick={handleClick}
                        >
                            Добавить
                        </Button>
                    </div>
                </div>
            </Section>
        </div>
    );
};

