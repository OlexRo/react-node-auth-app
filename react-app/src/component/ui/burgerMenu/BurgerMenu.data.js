//Иконки React
import {GrArticle, GrDomain} from 'react-icons/gr';
import {IoIosInformationCircle} from 'react-icons/io';
import {IoMdMail} from 'react-icons/io';
import {FaStar} from 'react-icons/fa';

export const BurgerMenuArray = [
    {
        id: 1,
        icon: GrDomain,
        link: '/',
        value: 'Главная'},
    {
        id: 4,
        icon: GrArticle,
        link: '/article',
        value: 'Статьи'
    },
    {
        id: 5,
        icon: IoIosInformationCircle,
        link: '/about',
        value: 'О нас'
    },
    {
        id: 7,
        icon: FaStar,
        link: '/favorites',
        value: 'Избранное'
    },
];