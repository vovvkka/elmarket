import React, { useState } from 'react';
import Anonymous from '../Anonymous/Anonymous';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/actions/usersActions';
import logo from '../../../assets/logo.png';
import cabinet from '../../../assets/svg/cabinet.svg';
import logout from '../../../assets/svg/logout.svg';
import phone from '../../../assets/svg/phone.svg';
import cart from '../../../assets/svg/cart.svg';
import searchIcon from '../../../assets/svg/search.svg';
import admin from '../../../assets/svg/admin.svg';
import { historyPush } from '../../../store/actions/historyActions';

const HeaderDesktop = ({ mainPage }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const products = useSelector((state) => state.cart.products);
    const contacts = useSelector(state => state.contacts.contacts);
    const classes = mainPage ? ['header', 'header--main-page'] : ['header'];

    const [search, setSearch] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        searchParams.set("search", search);
        searchParams.set("page", "1");
        const newUrl = `/search?${searchParams.toString()}`;
        dispatch(historyPush(newUrl));
    };

    return (
        <div className={classes.join(' ')}>
            <div className="container-sm">
                <div className="header__upper">
                    <div className="header__contacts-block">
                        <div className="header__phone">
                            <img
                                className="header__phone-icon"
                                src={phone}
                                alt="Телефон"
                                width={20}
                            />
                            <div className="header__numbers">
                                {contacts?.phone?.map(ph => <p className="header__number" key={ph}>{ph}</p>)}
                            </div>
                        </div>
                    </div>
                    {user ? (
                        <div className="header__user-menu">
                            {user?.role === 'admin' ? (
                                <>
                                    <p>Вы вошли как <Link to='/admin/products'>администратор</Link></p>
                                    <Link to='/admin/products'>
                                        <img
                                            src={admin}
                                            alt="Electromarket.kg"
                                            className="logo"
                                            draggable={false}
                                            width={35}
                                        />
                                    </Link>
                                </>
                            ) : null}
                            {user?.role !== 'admin' && (
                                <Link to="/profile">
                                    <img src={cabinet} alt="Профиль" />
                                </Link>
                            )}

                            <img
                                src={logout}
                                alt="Выйти"
                                onClick={() => dispatch(logoutUser())}
                            />
                        </div>
                    ) : (
                        <Anonymous />
                    )}
                </div>
                <div className="header__middle">
                    <div className="header__space"></div>
                    <ul>
                        <Link to="/sales">
                            <li>Акции</li>
                        </Link>
                        <Link to="/catalog?page=1">
                            <li>Каталог</li>
                        </Link>
                        <Link to="/about-us">
                            <li>O компании</li>
                        </Link>
                        <Link to="/warranty">
                            <li>Гарантия</li>
                        </Link>
                        <Link to="/contacts">
                            <li>Контакты</li>
                        </Link>
                        <Link to="/delivery">
                            <li>Доставка</li>
                        </Link>
                        <Link to="/payment">
                            <li>Оплата</li>
                        </Link>
                    </ul>
                    <div className="header__user-icons">
                        <div className="header__user-icon">
                            {user?.role !== 'admin' && (
                                <Link to="/cart" className="clickable">
                                    <img src={cart} alt="Cart" />
                                    {products.length ? (
                                        <div className="header__badge">
                                            {products.reduce((acc, obj) => acc + obj.quantity, 0)}
                                        </div>
                                    ) : null}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="header__bottom">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Electromarket.kg"
                            className="logo"
                            draggable={false}
                        />
                    </Link>
                    <form className="search" onSubmit={searchHandler}>
                        <input
                            className="search__input"
                            placeholder="поиск по каталогу"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="search__button" type="submit">
                            <img src={searchIcon} alt="Search" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HeaderDesktop;
