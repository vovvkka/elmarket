import React from 'react';
import logo from "../../../assets/logo-mobile.png";
import search from "../../../assets/svg/search.svg"
import heart from "../../../assets/svg/heart.svg";
import cart from '../../../assets/svg/cart.svg';
import burger from '../../../assets/svg/burger.svg';
import {Link} from "react-router-dom";

const HeaderMobile = ({mainPage}) => {
    const classes = mainPage ? ['header', 'header--main-page'] : ['header'];

    return (
        <div className={classes.join(' ')}>
            <div className='container-sm'>
                <div className='header__mobile'>
                    <Link to="/">
                        <img src={logo} alt="Electromarket.kg" className='logo' draggable={false} width='65' height='50'/>
                    </Link>
                    <div className='header__user-icons'>
                        <img className='header__user-icon' src={search} alt=""/>
                        <img className='header__user-icon' src={heart} alt=""/>
                        <Link to="/cart" className="clickable">
                            <img className='header__user-icon' src={cart} alt=""/>
                        </Link>
                        <img className='header__user-icon' src={burger} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMobile;