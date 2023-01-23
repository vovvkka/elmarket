import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {resetPassword} from "../store/actions/usersActions";

const ResetPassword = ({match}) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        password: "",
        password1: "",
    });

    const submitFormHandler = (e) => {
        e.preventDefault();

        dispatch(resetPassword(match.params.id, match.params.token, { ...user }));
    };
    const handleChange = (e) => {
        const {name, value} = e.target;

        setUser(prev => ({...prev, [name]: value}));
    };

    return (
        <div className="reset-password">
            <div className="reset-password__block">
                <h2 className="reset-password__title">Сброс пароля</h2>

                <form onSubmit={submitFormHandler}>
                    <div className="reset-password__inputs">
                        <div className="reset-password__input-block">
                            <label>Введите новый пароль</label>
                            <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                className="reset-password__input"
                                value={user?.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="reset-password__input-block">
                            <label>Подтвердите новый пароль</label>
                            <input
                                type="password"
                                name="password1"
                                autoComplete="off"
                                className="reset-password__input"
                                value={user?.password1}
                                onChange={handleChange}
                            />
                        </div>

                        <button className="button">Сбросить пароль</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;