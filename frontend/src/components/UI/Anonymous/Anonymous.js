import React from 'react';

const Anonymous = () => {
    return (
        <div className='header__anonymous-menu'>
            <ul className='header__menu-list'>
                <li className='header__menu-item header__menu-item--first'>Вход</li>
                <li className='header__menu-item'>Регистрация</li>
            </ul>
        </div>
    );
};

export default Anonymous;