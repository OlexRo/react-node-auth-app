import {useState} from 'react';
import axios from 'axios';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
//Стили
import '../modal/Modal.sass'
//Компоненты
import {Button} from '../button/Button';
import {FaAddressCard, FaUser} from "react-icons/fa6";
import {FaIdCardAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
//Иконки
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';

const SignupSchema = Yup.object().shape({
    user_name: Yup.string()
        .required('Обязательное поле')
        .min(2, 'Минимум 2 буквы')
        .max(50, 'Максимум 50 букв'),
    user_surname: Yup.string()
        .required('Обязательное поле')
        .min(2, 'Минимум 2 буквы')
        .max(50, 'Максимум 50 букв'),
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
    user_DoublePassword: Yup.string()
        .oneOf([Yup.ref('user_password'), null], 'Пароли должны совпадать')
});

export const RegistrationModal =({children}) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                user_name: '',
                user_password: '',
                user_login: '',
                user_surname: '',
                user_DoublePassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={ (values) => {
                axios.post('http://localhost:5000/register', values)
                    .then(res => {
                        if(res.data.Status === "Успешно") {
                            navigate('/');
                            alert('Вы успешно зарегистрировались, войдите в аккаунт')
                        }
                        else {
                            alert("Ошибка регистрции");
                        }
                    })
                    .then(err => console.log(err));
            }}
        >
            {({ errors, touched }) => (
                <Form className='formWrapper'>
                    <div className='modalForm'>
                        {/*Поле для имени*/}
                        <div className='modalFormField'>
                            <FaAddressCard className='modalFormIcon'/>
                            <Field
                                type='text'
                                required
                                autoComplete='off'
                                id='Name'
                                name='user_name'
                            />
                            <label
                                htmlFor='Name'
                                title='Ваше имя'
                                data-title='Ваше имя'>
                            </label>
                        </div>
                        {errors.user_name && touched.user_name ? (
                            <div className='modalFormErrorValid'>
                                {errors.user_name}
                            </div>
                        ) : null}
                    </div>
                    {/*Поле для фамилии*/}
                    <div className='modalForm'>
                        <div className='modalFormField'>
                            <FaIdCardAlt className='modalFormIcon'/>
                            <Field
                                type='text'
                                required
                                autoComplete='off'
                                id='Surname'
                                name='user_surname'
                            />
                            <label
                                htmlFor='Surname'
                                title='Ваша Фамилия'
                                data-title='Ваша Фамилия'>
                            </label>
                        </div>
                        {errors.user_surname && touched.user_surname ? (
                            <div className='modalFormErrorValid'>
                                {errors.user_surname}
                            </div>
                        ) : null}
                    </div>
                    {/*Поле для логина*/}
                    <div className="modalForm">
                        <div className="modalFormField">
                            <FaUser className='modalFormIcon'/>
                            <Field
                                type='text'
                                required
                                autoComplete='off'
                                id='login_in'
                                name='user_login'/>
                            <label
                                htmlFor='login_in'
                                title='Ваш Логин'
                                data-title='Ваш Логин'>
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
                                type={showPassword
                                    ? 'text'
                                    : 'password'}
                                required
                                autoComplete='off'
                                id='password'
                                name='user_password'
                            />
                            <label
                                htmlFor='password'
                                title='Ваш Пароль'
                                data-title='Ваш Пароль'>
                            </label>
                            <button
                                className='modalFormFieldPasswordButton'
                                type='button'
                                onClick={togglePasswordVisibility}>
                                {showPassword
                                    ? <FaEye size={20}/>
                                    : <IoEyeOff size={20}/>}
                            </button>
                        </div>
                        {errors.user_password && touched.user_password ? (
                            <div className='modalFormErrorValid'>
                                {errors.user_password}
                            </div>
                        ) : null}
                    </div>
                    {/*Поле для повтора пароля*/}
                    <div className='modalForm'>
                        <div className='modalFormField'>
                            <RiLockPasswordFill className='modalFormIcon'/>
                            <Field
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete='off'
                                    id='repeat_password'
                                    name='user_DoublePassword'/>
                            <label htmlFor='repeat_password'
                                    title='Повторите Ваш Пароль'
                                    data-title='Повторите Ваш Пароль'>
                            </label>
                        </div>
                        {errors.user_DoublePassword && touched.user_DoublePassword ? (
                            <div className='modalFormErrorValid'>
                                {errors.user_DoublePassword}
                            </div>
                        ) : null}
                    </div>
                    {/*Кнопка для регистрации*/}
                    <Button width='200px' type='button'>
                        Регистрация
                    </Button>
                    {children}
                </Form>
            )}
        </Formik>
    );
};

