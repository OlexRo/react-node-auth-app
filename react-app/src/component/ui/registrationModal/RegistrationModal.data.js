//Иконки React
import {FaAddressCard, FaUser} from 'react-icons/fa6';
import {FaIdCardAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';

export const UserModalArray = [
    {
        id: 1,
        icon: FaAddressCard,
        type: 'text',
        idInp: 'Name',
        title: 'Ваше имя',
        name: 'user_name'
    },
    {
        id: 2,
        icon: FaIdCardAlt,
        type: 'text',
        idInp: 'Surname',
        title: 'Ваша Фамилия',
        name: 'user_surname'
    },
    {
        id: 3,
        icon: FaUser,
        type: 'text',
        idInp: 'login',
        title: 'Ваш Логин',
        name: 'user_login'
    },
    {
        id: 4,
        icon: RiLockPasswordFill,
        type: 'password',
        idInp: 'password',
        title: 'Ваш Пароль',
        name: 'user_password'
    },
    {
        id: 5,
        icon: RiLockPasswordFill,
        type: 'password',
        idInp: 'repeat_password',
        title: 'Повторите Ваш Пароль',
        name: 'user_DoublePassword'
    }
];