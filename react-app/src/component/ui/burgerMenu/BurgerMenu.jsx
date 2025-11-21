//Данные
import {BurgerMenuArray} from './BurgerMenu.data';
//Стили
import './BurgerMenu.sass'
//Router
import {Link} from 'react-router-dom';

export const BurgerMenu = ({children,
                            activeBurger,
                            setBurgerActive}) => {
    return (
            <div
                className={activeBurger
                ? 'burgerMenuWrapper active'
                : 'burgerMenuWrapper'}
                onClick={() => setBurgerActive(false)}
            >
                <div
                    className={activeBurger
                    ? 'burgerMenu active'
                    : 'burgerMenu'}
                    onClick={e => e.stopPropagation()}
                >
                    {children}
                    {BurgerMenuArray.map(item =>
                        (<div
                            key={item.id}
                            className='burgerMenuLinkWrapper'>
                            {<item.icon
                                size='20'
                                color='white'
                            />}
                            <Link
                                className='burgerMenuLink'
                                to={item.link}>
                                {item.value}
                            </Link>
                    </div>))}
                </div>
            </div>
    );
};

