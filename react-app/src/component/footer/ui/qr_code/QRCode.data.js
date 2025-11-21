//Иконки
import { SlSocialVkontakte } from "react-icons/sl";
import {IoLogoWhatsapp} from 'react-icons/io';
import {FaTelegram} from 'react-icons/fa';
//Картинки
import qr_one from '../../../../asset/image/footerPhoto/qr_three.jpg'
import qr_two from '../../../../asset/image/footerPhoto/qr_two.jpg'
import qr_three from '../../../../asset/image/footerPhoto/qr-four.jpg'
export const QrCodeArray = [
    {
        id: 111,
        href: '/',
        icon: SlSocialVkontakte ,
        img: qr_one,
        nickName: '#first_humans'
    },
    {
        id: 121,
        href: '/',
        icon: IoLogoWhatsapp,
        img: qr_three,
        nickName: 'first_humans'},
    {
        id: 131,
        href: '/',
        icon: FaTelegram,
        img: qr_two,
        nickName: 'f_humans'},
];