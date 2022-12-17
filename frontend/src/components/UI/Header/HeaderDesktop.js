import React from 'react';
import Anonymous from "../Anonymous/Anonymous";
import logo from '../../../assets/logo.png';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import profile from '../../../assets/svg/profile.svg';
import logout from '../../../assets/svg/logout.svg';
import phone from '../../../assets/svg/phone.svg';
import arrow from '../../../assets/svg/arrow.svg';
import heart from '../../../assets/svg/heart.svg';
import cart from '../../../assets/svg/cart.svg';
import search from '../../../assets/svg/search.svg';
import {logoutUser} from "../../../store/actions/usersActions";

const HeaderDesktop = ({mainPage}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const classes = mainPage ? ['header', 'header--main-page'] : ['header'];

    return (
        <div className={classes.join(' ')}>
            <div className='container-sm'>
                <div className='header__upper'>
                    <div className='header__contacts-block'>
                        <div className='header__phone'>
                            <img className='header__phone-icon' src={phone} alt="Phone"/>
                            <div className='header__numbers'>
                                <p className='header__number'>(996) 777-77-11-07</p>
                                <p className='header__number'>(996) 709-40-39-55</p>
                            </div>
                        </div>
                        <p className='header__callback'>Обратный звонок</p>
                        <div className='header__circle'>
                            <img src={arrow} alt="<"/>
                        </div>
                    </div>
                    {user ? <div className='header__user-menu'>
                        <Link to='/profile'><img src={profile} alt="Profile"/></Link>
                        <img src={logout} alt="Logout" onClick={() => dispatch(logoutUser())}/>
                    </div> : <Anonymous/>
                    }
                </div>
                <div className='header__middle'>
                    <div className='header__space'></div>
                    <ul>
                        <li>Акции</li>
                        <li>Каталог</li>
                        <Link to='/about-us'><li>O компании</li></Link>
                        <li>Сервис</li>
                        <Link to='/warranty'><li>Гарантия</li></Link>
                        <li>Контакты</li>
                        <Link to='/delivery'><li>Доставка</li></Link>
                        <Link to='/payment'><li>Оплата</li></Link>
                    </ul>
                    <div className='header__user-icons'>
                        <img src={heart} alt="Liked"/>
                        <img src={cart} alt="Cart"/>
                    </div>
                </div>
                <div className='header__bottom'>
                    <Link to='/'><img src={logo} alt="Electromarket.kg" className='logo' draggable={false}/></Link>
                    <div className='search'>
                        <input className='search__input' placeholder='поиск по каталогу' type="text"/>
                        <div className='search__button'>
                            <img src={search} alt="Search"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderDesktop;