import React from 'react';
import activatedIcon from "../assets/activated.png";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Activated = () => {
    const user = useSelector(state => state.users.user);

    return (
        <div className="activated">
            <div className="activated__block">
                <img
                    src={activatedIcon}
                    alt="activated"
                    className="activated__icon"
                />

                <h2 className="activated__text">Вы успешно активировали аккаунт!</h2>

                {
                    user ?
                        <Link className="button activated__button" to="/">Вернуться на главную</Link> :
                        <p className="activated__authorize">Теперь вы можете авторизоваться под своими данными</p>

                }
            </div>
        </div>
    );
};

export default Activated;