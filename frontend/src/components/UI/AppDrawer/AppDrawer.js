import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import burger from '../../../assets/svg/burger.svg';
import logo from '../../../assets/logo.png';
import Backdrop from '../Backdrop/Backdrop';
import { useSelector } from 'react-redux';

const AppDrawer = () => {
    const user = useSelector((state) => state.users.user);
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <Backdrop show={sidebar} clicked={showSidebar} />
            <div className="navbar">
                <Link to="#" className="navbar__menu-bars">
                    <img
                        className="header__user-icon"
                        src={burger}
                        alt=""
                        onClick={showSidebar}
                    />
                </Link>
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
                        <img src={logo} alt="" width={200} />
                    </div>
                    <ul className="navbar__list">
                        {user && (
                            <Link to={user.role === 'admin' ? '/admin/products' : '/profile'}>
                                <li>Личный кабинет</li>
                            </Link>
                        )}
                        <Link to="/sales">
                            <li>Акции</li>
                        </Link>
                        <Link to="/catalog">
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
                </div>
            </nav>
        </>
    );
};

export default AppDrawer;
