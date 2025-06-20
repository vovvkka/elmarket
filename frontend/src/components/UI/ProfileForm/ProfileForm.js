import React, {useEffect, useState} from 'react';
import contacts from '../../../assets/svg/contacts.svg';
import pen from '../../../assets/svg/pen.svg';
import {useDispatch} from 'react-redux';
import {changePassword} from '../../../store/actions/usersActions';
import InputMask from "react-input-mask";

const ProfileForm = ({ onSubmit, profile, isAdmin }) => {
    const dispatch = useDispatch();

    const [profileInfo, setProfileInfo] = useState({
        username: '',
        email: '',
        phone: '',
        additionalPhone: '',
    });

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        newPassword2: '',
    });

    useEffect(() => {
        if (profile) {
            Object.keys(profile).forEach((key) => {
                setProfileInfo((prev) => ({ ...prev, [key]: profile[key] }));
            });
        }
    }, [profile]);

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setProfileInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const changePasswordHandler = (name, value) => {
        setPasswords((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitPassword = (e) => {
        e.preventDefault();
        dispatch(changePassword(passwords));
        setPasswords({
            currentPassword: '',
            newPassword: '',
            newPassword2: '',
        });
    };

    return (
        <div className={isAdmin ? "profile-form profile-form__admin" : "profile-form"}>
            <div className="container-xs">
                <div className="profile-form__upper">
                    <div className={isAdmin ? "profile-form__block-admin" : "profile-form__block"}>
                        <h3 className="profile__title profile__title--form">
                            <img src={contacts} alt="Контакты" />
                            Контактные данные
                        </h3>
                        <div className="profile-form__fields">
                            <div className="profile-form__field">
                                <label>ФИО</label>
                                <input
                                    className="profile-form__input"
                                    type="text"
                                    name="username"
                                    value={profileInfo.username}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                            <div className="profile-form__field">
                                <label>E-mail</label>
                                <input
                                    className="profile-form__input"
                                    type="text"
                                    name="email"
                                    value={profileInfo.email}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                            <div className="profile-form__field">
                                <label>Телефон</label>
                                <InputMask mask="+\9\96(999)99-99-99" value={profileInfo?.phone} onChange={changeHandler}>
                                    {
                                        inputProps => <input
                                            {...inputProps}
                                            type="tel"
                                            className="profile-form__input"
                                            name="phone"
                                        />
                                    }
                                </InputMask>
                            </div>
                            <div className="profile-form__field">
                                <label>Дополнительный телефон</label>
                                <InputMask mask="+\9\96(999)99-99-99" value={profileInfo?.additionalPhone} onChange={changeHandler}>
                                    {
                                        inputProps => <input
                                            {...inputProps}
                                            type="tel"
                                            className="profile-form__input"
                                            name="additionalPhone"
                                        />
                                    }
                                </InputMask>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="profile-form__button"
                    onClick={() => onSubmit(profileInfo)}
                >
                    Сохранить
                </button>
            </div>
            <hr className="profile-form__divider" />
            <div className="container-xs">
                <form className={isAdmin ? "profile-form__block-admin" : "profile-form__block"} onSubmit={submitPassword}>
                    <h3 className="profile__title profile__title--form">
                        <img src={pen} alt="Контакты" />
                        Контактные данные
                    </h3>
                    <div className="profile-form__fields">
                        <div className="profile-form__field">
                            <label>Текущий пароль</label>
                            <input
                                className="profile-form__input"
                                type="password"
                                name="currentPassword"
                                value={passwords.currentPassword}
                                onChange={(e) =>
                                    changePasswordHandler(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                                autoComplete="current_password"
                                required
                            />
                        </div>
                        <div className="profile-form__field">
                            <label>Новый пароль</label>
                            <input
                                className="profile-form__input"
                                type="password"
                                name="newPassword"
                                value={passwords.newPassword}
                                onChange={(e) =>
                                    changePasswordHandler(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                                autoComplete="new_password"
                                required
                            />
                        </div>
                        <div className="profile-form__field">
                            <label>Новый пароль повторно</label>
                            <input
                                className="profile-form__input"
                                type="password"
                                name="newPassword2"
                                value={passwords.newPassword2}
                                onChange={(e) =>
                                    changePasswordHandler(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                                autoComplete="new_password"
                                required
                            />
                        </div>
                    </div>
                    <button className="profile-form__button" type="submit">
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
