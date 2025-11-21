import React, {useEffect} from 'react';
import axios from "axios"
import {useNavigate} from 'react-router-dom';
//Router
import {Route, Routes, Link} from 'react-router-dom';
//Компоненты React
import {Header} from './component/header/Header';
import {Modal} from './component/ui/modal/Modal';
import {RegistrationModal} from './component/ui/registrationModal/RegistrationModal';
import {BurgerMenu} from './component/ui/burgerMenu/BurgerMenu';
//Стили
import styles from './component/header/Header.module.sass';
import './component/ui/modal/Modal.sass';
//Иконки
import {FaStar} from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { AiOutlineMenuFold } from 'react-icons/ai';
//Страницы
import {Home} from './pages/home/Home';
import {Article} from './pages/article/Article';
import {About} from './pages/about/About';
import {Favorites} from './pages/favorites/Favorites';
import {LoginModal} from './component/ui/loginModal/LoginModal';
import {Footer} from './component/footer/Footer';
import {CreateArticle} from "./pages/createArticle/createArticle";
import {PersonalArea} from "./pages/personalArea/PersonalArea";
import {ArticlePerson} from './pages/articlePerson/articlePerson';
import {UpdateArticle} from './pages/updateArticle/updateArticle.jsx';
//Картинки
import imageAvatr from './asset/image/image_logo.png';
import {PersonalAreaUser} from './pages/personalAreaUser/PersonalAreaUser.jsx';
import imageBurger from './asset/image/imageBurger.png';

export const App = () => {
    const navigate = useNavigate();
    const[modalActive, setModalActive] = React.useState(false);
    const[burgerActive, setBurgerActive] = React.useState(false);
    const[modalLogin, setModalLogin] = React.useState(false);

    useEffect(() => {
        const storedBurgerLogLK = localStorage.getItem('burgerLogLK');
        const storedBurgerLog = localStorage.getItem('burgerLog');
        if (storedBurgerLog) {
            document.querySelector('#burgerLog').style.display = storedBurgerLog;
        }
        if (storedBurgerLogLK) {
            document.querySelector('#burgerLogLK').style.display = storedBurgerLogLK;
        }
    }, []);

    const Login = (e) => {
        e.preventDefault();
        try {
            axios.get('http://localhost:5000/')
                .then(res => {
                    if(res.data.user_role === "Администратор") {
                        navigate('/personalArea');
                        window.location.reload();
                    }
                    else if(res.data.user_role === "Пользователь"){
                        navigate('/personalAreaUser');
                        window.location.reload();
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='App'>
            {/*Модальное окно*/}
            <Modal
                active={modalActive}
                setActive={setModalActive}
            >
                <button
                    className='modalExit'
                    onClick={() =>
                        setModalActive(false)}
                >
                    Выход
                </button>
                {/*Модальное окно регистрации*/}
                {modalLogin
                    ? <RegistrationModal>
                        <button
                            className='modalButtonLogin'
                            onClick={() =>
                                setModalLogin(false)}
                        >
                            Войти
                        </button>
                    </RegistrationModal>
                    : <LoginModal>
                        <button
                            className='modalButtonLogin'
                            onClick={() =>
                                setModalLogin(true)}
                        >
                            Регистрация
                        </button>
                    </LoginModal>}
            </Modal>
            {/*Бургер меню*/}
            <BurgerMenu
                activeBurger={burgerActive}
                setBurgerActive={setBurgerActive}
            >
                <div
                    id='burgerLog'
                    className='burgerMenuLoginWrapper'>
                    <div
                        className='burgerMenuLogin'
                        onClick={() => setModalActive(true)}
                    >
                        <img
                            src={imageBurger}
                            alt='Аватарка пользователя'
                            title='Аватарка пользователя'
                        />
                        <span>
                            Войти
                        </span>
                    </div>
                </div>
                <Link to='/personalArea'>
                    <div
                        id='burgerLogLK'
                        className='burgerMenuLoginWrapper'
                    >
                        <div className='burgerMenuLogin'>
                            <img
                                src={imageAvatr}
                                alt='Аватарка пользователя'
                                title='Аватарка пользователя'
                            />
                        </div>
                    </div>
                </Link>
            </BurgerMenu>
            {/*Шапка сайта*/}
            <Header>
                <div className={styles.headerNews}>
                    <Link to='/Favorites'>
                        <FaStar
                            id='favoriteIcon'
                            className={styles.Icon}
                            color='white'
                            size={30}
                        />
                    </Link>
                </div>
                <div className={styles.headerPrivateOffice}>
                    <div
                        id='loginForm'
                        className={styles.headerUser}
                        onClick={() => setModalActive(true)}>
                        <FaCircleUser size={30}/>
                    </div>
                    <img
                        src={imageAvatr}
                        alt='Аватарка пользователя'
                        title='Аватарка пользователя'
                        onClick={Login}
                        id='userIconID'
                        className={styles.IconUser}
                    />
                    <AiOutlineMenuFold
                        className={styles.IconBurger}
                        size={40}
                        onClick={() => setBurgerActive(true)}
                    />
                </div>
            </Header>
            {/*Прослойка*/}
            <div className='underHeader'>
                Прослойка
            </div>
            {/*Маршрутизация*/}
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/article' element={<Article/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/favorites' element={<Favorites/>}/>
                <Route path='/createArticle' element={<CreateArticle/>}/>
                <Route path='/personalArea' element={<PersonalArea/>}/>
                <Route path='/personalAreaUser' element={<PersonalAreaUser/>}/>
                <Route path='/articlePerson/:id' element={<ArticlePerson/>}/>
                <Route path='/updateArticle/:id' element={<UpdateArticle/>}/>
            </Routes>
            {/*Подвал сайта */}
            <Footer/>
        </div>
    );
};
