import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import burger from '../../../assets/svg/burger.svg';
import logo from '../../../assets/logo.png';
import Backdrop from '../Backdrop/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/actions/usersActions';
import Anonymous from '../Anonymous/Anonymous';

const AppDrawer = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

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
                <div className="navbar__menu-items" onClick={showSidebar}>
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
                                <Anonymous />
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
