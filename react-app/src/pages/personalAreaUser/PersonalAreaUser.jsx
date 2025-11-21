import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
//Данные
import {personalAreaArray} from './PersonalAreaUser.data.js';
//Стили
import styles from './PersonalAreaUser.module.sass';
//Иконки
import {IoIosExit} from 'react-icons/io';
import { MdBroadcastOnPersonal } from 'react-icons/md';
//Картинки
import imageAvatr from './../../asset/image/image_logo.png';

export const PersonalAreaUser = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [activeBlock, setActiveBlock] = useState(1);
    const handleButtonClick = (blockNumber) => {
        setActiveBlock(blockNumber);
    };

    //Стейты для вывода данныз из сервера
    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [date, setDate] = useState('');
    const [role, setRole] = useState('');

    //Отображение данных из сервера при входе в личный кабиенет
    useEffect(() => {
        axios.get('http://localhost:5000')
            .then(res => {
                if(res.data.Status === "Успешно") {
                    setName(res.data.user_name);
                    setLogin(res.data.user_login);
                    setSurname(res.data.user_surname);
                    setDate(res.data.user_regist_date);
                    setRole(res.data.user_role);
                    console.log(res.data)
                }
            })
            .then(err => console.log(err));
    }, []);

    useEffect(() => {
        const storedLoginFormDisplay = localStorage.getItem('loginFormDisplay');
        const storeUserIconID = localStorage.getItem('userIconID');
        const storedFavoriteIcon = localStorage.getItem('favoriteIcon');
        if (storedFavoriteIcon) {
            document.querySelector('#favoriteIcon').style.display = storedFavoriteIcon;
        }
        if (storedLoginFormDisplay) {
            document.querySelector('#loginForm').style.display = storedLoginFormDisplay;
        }
        if(storeUserIconID) {
            document.querySelector('#userIconID').style.display = storeUserIconID;
        }
    }, []);

    //Выход из личного кабинета
    const ExitPersonalArea = () => {
        axios.post('http://localhost:5000/logout')
            .then(res => {
                if (res.data.Status === "Вы вышли из системы") {
                    navigate('/')
                    console.log(res);
                    localStorage.setItem('favoriteIcon', 'none');
                    localStorage.setItem('loginFormDisplay', 'flex');
                    localStorage.setItem('userIconID', 'none');
                    localStorage.setItem('burgerLogLK', 'none');
                    localStorage.setItem('burgerLog', 'flex');
                    window.location.reload();
                    console.log("Вы успешно вышли");
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div className={styles.personalArea}>
            {/*Левая часть личного кабинета*/}
            <div className={styles.personalAreaLeftBarWrapper}>
                {/*Sidebar для навигации в ЛК*/}
                <div className={styles.personalAreaLeftBarTop}>
                    <h3>
                        ЛИЧНЫЙ КАБИНЕТ
                    </h3>
                    <MdBroadcastOnPersonal
                        className={styles.personalAreaLeftMobileHome}
                        size='40'
                        color='white'
                    />
                    {/*Сылки между блоками правой части ЛК*/}
                    {personalAreaArray.map(item => (
                        <div
                            key={item.id}
                            className={styles.personalAreaLink}
                        >
                            <button
                                className={styles.personalAreaLinkButton}
                                onClick={() => handleButtonClick(item.link)}
                            >
                                {<item.icon
                                    className={styles.personalAreaLeftDeskLink}
                                    size="20"
                                    color="white"/>}
                                <item.icon
                                    className={styles.personalAreaLeftMobileLink}
                                    size="30"
                                    color="white"/>
                                <span>
                                    {item.value}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
                {/*Фотография, имя и кнопка выход из аккаунта*/}
                <div className={styles.personalAreaLeftBarBottom}>
                    <div className={styles.personalAreaLeftBarBottomProfile}>
                        <img
                            src={imageAvatr}
                            alt='app-photo'
                        />
                        <p>
                            {name}
                        </p>
                    </div>
                    <div className={styles.personalAreaLeftBarBottomExit} onClick={ExitPersonalArea}>
                        <IoIosExit
                            className={styles.personalAreaLeftDeskLink}
                            color='white'
                            size={30}
                        />
                        <IoIosExit
                            className={styles.personalAreaLeftMobileLink}
                            color='white'
                            size={40}
                        />
                        <button type='submit'>
                            Выход
                        </button>
                    </div>
                </div>
            </div>
            {/*Прававя часть личного кабинета*/}
            <div className={styles.personalAreaRight}>
                {activeBlock === 1 &&
                    <>
                        <div className={styles.personalAreaRightLogin}>
                            <h1>ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ</h1>
                            <div className={styles.personalAreaRightLoginChild}>
                                <div className={styles.personalAreaRightLoginChildSecond}>
                                    <img
                                        src={imageAvatr}
                                        alt='app-photo'
                                    />
                                    <div className={styles.personalAreaRightLoginChildLogPanel}>
                                        <h4>{role} сайта</h4>
                                        <h3>{login}</h3>
                                        <h4>{name} {surname} </h4>
                                        <h4>Зарегистрирован с {date}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    );
};