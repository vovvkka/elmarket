import React, {useState} from 'react';
import Modal from "../Modal/Modal";

const Anonymous = () => {
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);

    return (
        <>
            <Modal
                show={show}
                login={login}
                register={register}
                closed={() => {
                    setShow(false);
                    setRegister(false);
                    setLogin(false);
                }}
            />

            <div className='header__anonymous-menu'>
                <ul className='header__menu-list'>
                    <li className='header__menu-item header__menu-item--first' onClick={() => {
                        setShow(true);
                        setLogin(true);
                    }}>
                        Вход
                    </li>

                    <li className='header__menu-item' onClick={() => {
                        setShow(true);
                        setRegister(true);
                    }}>
                        Регистрация
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Anonymous;