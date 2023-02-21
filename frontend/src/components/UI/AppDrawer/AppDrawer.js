import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import burger from '../../../assets/svg/burger.svg';
import logo from '../../../assets/logo.png';
import Backdrop from '../Backdrop/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/actions/usersActions';
import Anonymous from '../Anonymous/Anonymous';
import searchIcon from '../../../assets/svg/search.svg';
import { historyPush } from '../../../store/actions/historyActions';

const AppDrawer = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.users.user);
    const [sidebar, setSidebar] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const body = document.querySelector('body');
        setSidebar(false);
        body.classList.remove('open');
    }, [location]);

    const showSidebar = () => setSidebar(!sidebar);

    const searchHandler = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        searchParams.set('search', search);
        searchParams.set('page', '1');
        const newUrl = `/search?${searchParams.toString()}`;
        dispatch(historyPush(newUrl));
        setSidebar(false);
    };

    return (
        <>
            <Backdrop show={sidebar} clicked={showSidebar} />
            <div className="navbar">
                <div className="navbar__menu-bars">
                    <img
                        className="header__user-icon"
                        src={burger}
                        alt="Навигация"
                        onClick={showSidebar}
                    />
                </div>
            </div>
            <nav
                className={
                    sidebar
                        ? 'navbar__nav-menu navbar__nav-menu--active'
                        : 'navbar__nav-menu'
                }
            >
                <div className="navbar__menu-items">
                    <p className="navbar__close-btn" onClick={showSidebar}>
                        &times;
                    </p>
                    <div className="navbar__logo">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Electromarket.kg"
                                width={200}
                            />
                        </Link>
                    </div>
                    <form
                        className="search search--mobile"
                        onSubmit={searchHandler}
                    >
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
                    <ul className="navbar__list">
                        {user && (
                            <Link
                                to={
                                    user.role === 'admin'
                                        ? '/admin/products?page=1'
                                        : '/profile'
                                }
                            >
                                <li>Личный кабинет</li>
                            </Link>
                        )}
                        {!user ? (
                            <div className="navbar__auth">
                                <Anonymous
                                    onDrawerClose={() => setSidebar(false)}
                                />
                            </div>
                        ) : null}

                        <Link to="/sales?page=1">
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
                            <li className="navbar__last">Оплата</li>
                        </Link>
                    </ul>
                    {user ? (
                        <button
                            className="navbar__logout"
                            onClick={() => dispatch(logoutUser())}
                        >
                            Выйти
                        </button>
                    ) : null}
                </div>
            </nav>
        </>
    );
};

export default AppDrawer;
