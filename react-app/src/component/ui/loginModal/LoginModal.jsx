import React, {useEffect} from 'react';
import axios from 'axios';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
// Стили
import '../modal/Modal.sass'
// Компоненты
import {Button} from '../button/Button';
import {FaUser} from 'react-icons/fa6';
//Иконки
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import {RiLockPasswordFill} from 'react-icons/ri';
import {useNavigate} from 'react-router-dom';

//Валидация
const SignupSchema = Yup.object().shape({
    user_login: Yup.string()
        .required('Обязательное поле')
        .min(2, 'Минимум 2 символа')
        .max(50, 'Максимум 15 символов'),
    user_password: Yup.string()
        .required('Обязательное поле')
        .min(2, 'Минимум 2 буквы')
        .matches(/[0-9]/, 'Введите хотя бы 1 число')
        .matches(/[a-z]/, 'Введите хотя бы 1 строчную букву')
        .matches(/[A-Z]/, 'Введите хотя бы 1 заглавную букву'),
});

export const LoginModal = ({children}) => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const storedLoginFormDisplay = localStorage.getItem('loginFormDisplay');
        const storeUserIconID = localStorage.getItem('userIconID');
        const storedBurgerLogLK = localStorage.getItem('burgerLogLK');
        const storedBurgerLog = localStorage.getItem('burgerLog');
        const storedFavoriteIcon = localStorage.getItem('favoriteIcon');
        if (storedFavoriteIcon) {
            document.querySelector('#favoriteIcon').style.display = storedFavoriteIcon;
        }
        if (storedBurgerLog) {
            document.querySelector('#burgerLog').style.display = storedBurgerLog;
        }
        if (storedBurgerLogLK) {
            document.querySelector('#burgerLogLK').style.display = storedBurgerLogLK;
        }
        if (storedLoginFormDisplay) {
            document.querySelector('#loginForm').style.display = storedLoginFormDisplay;
        }
        if(storeUserIconID) {
            document.querySelector('#userIconID').style.display = storeUserIconID;
        }
    }, []);

    return (
        <Formik className='formWrapper'
                initialValues={{
                    user_login: '',
                    user_password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={ (values) => {
                    axios.post('http://localhost:5000/login', values)
                        .then(res => {
                            if(res.data.Status === "Администратор") {
                                navigate('/personalArea');
                                localStorage.setItem('favoriteIcon', 'flex');
                                localStorage.setItem('loginFormDisplay', 'none');
                                localStorage.setItem('userIconID', 'flex');
                                localStorage.setItem('burgerLogLK', 'flex');
                                localStorage.setItem('burgerLog', 'none');
                                window.location.reload();
                            }
                            else if(res.data.Status === "Пользователь"){
                                navigate('/personalAreaUser');
                                localStorage.setItem('favoriteIcon', 'flex');
                                localStorage.setItem('loginFormDisplay', 'none');
                                localStorage.setItem('userIconID', 'flex');
                                localStorage.setItem('burgerLogLK', 'flex');
                                localStorage.setItem('burgerLog', 'none');
                                window.location.reload();
                            }
                            else if(res.data.Status !== "Администратор" || res.data.Status !== "Пользователь") {
                                alert("Ошибка аторизации");
                                console.log(res.data)
                            }
                        })
                        .then(err => console.log(err));
                }}
        >
            {/*Поле для логина*/}
            {({ errors, touched }) => (
                <Form className='formWrapper'>
                    {/*Поле для логина*/}
                    <div className='modalForm'>
                        <div className='modalFormField'>
                            <FaUser className='modalFormIcon'/>
                            <Field
                                type='text'
                                required
                                autoComplete='off'
                                id='login_us'
                                name='user_login'
                            />
                            <label
                                htmlFor='login_us'
                                title='Ваш логин'
                                data-title='Ваш логин'>
                            </label>
                        </div>
                        {errors.user_login && touched.user_login ? (
                            <div className='modalFormErrorValid'>
                                {errors.user_login}
                            </div>
                        ) : null}
                    </div>
                    {/*Поле для пароля*/}
                    <div className='modalForm'>
                        <div className='modalFormField'>
                            <RiLockPasswordFill className='modalFormIcon'/>
                            <Field
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete='off'
                                id='password'
                                name='user_password'
                            />
                            <label
                                htmlFor='password'
                                title='Ваш Пароль'
                                data-title='Ваш Пароль'
                            >
                            </label>
                            <div
                                className='modalFormFieldPasswordButton'
                                onClick={togglePasswordVisibility}>
                                {showPassword
                                    ? <FaEye size={20}/>
                                    : <IoEyeOff size={20}/>}
                            </div>
                        </div>
                        {errors.user_password && touched.user_password ? (
                            <div className='modalFormErrorValid'>
                                {errors.user_password}
                            </div>
                        ) : null}
                    </div>
                    <Button width='200px'>
                        Войти
                    </Button>
                    {children}
                </Form>
            )}
        </Formik>
    );
};

