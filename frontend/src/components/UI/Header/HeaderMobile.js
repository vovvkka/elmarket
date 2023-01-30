import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo-mobile.png';
import cart from '../../../assets/svg/cart.svg';
import AppDrawer from '../AppDrawer/AppDrawer';
import Backdrop from '../Backdrop/Backdrop';
import { useSelector } from 'react-redux';

const HeaderMobile = ({ mainPage }) => {
    const user = useSelector((state) => state.users.user);
    const classes = mainPage ? ['header', 'header--main-page'] : ['header'];

    return (
        <>
            <Backdrop />
            <div className={classes.join(' ')}>
                <div className="container-sm">
                    <div className="header__mobile">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Electromarket.kg"
                                className="logo"
                                draggable={false}
                                width="65"
                                height="50"
                            />
                        </Link>
                        <div className="header__user-icons">
                            {!user || user?.role !== 'admin' ? (
                                <Link to="/cart" className="clickable">
                                    <img
                                        className="header__user-icon"
                                        src={cart}
                                        alt="Корзина"
                                    />
                                </Link>
                            ) : null}
                            <AppDrawer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderMobile;
