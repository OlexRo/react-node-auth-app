//Иконки React
import {FaUser} from 'react-icons/fa6';
import {RiLockPasswordFill} from 'react-icons/ri';

export const UserLoginModalArray = [
    {
        id: 1,
        icon: FaUser,
        type: 'text',
        idInp: 'Name',
        title: 'Ваш логин'
    },
    {
        id: 2,
        icon: RiLockPasswordFill,
        type: 'text',
        idInp: 'Surname',
        title: 'Ваш пароль'
    },
];