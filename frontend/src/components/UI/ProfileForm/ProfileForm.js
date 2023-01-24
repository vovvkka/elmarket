import React, { useEffect, useState } from 'react';
import contacts from '../../../assets/svg/contacts.svg';
import address from '../../../assets/svg/address.svg';
import pen from '../../../assets/svg/pen.svg';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../../store/actions/usersActions';

const ProfileForm = ({ onSubmit, profile }) => {
    const dispatch = useDispatch();

    const [profileInfo, setProfileInfo] = useState({
        username: '',
        email: '',
        phone: '',
        additionalPhone: '',
        city: '',
        street: '',
        house: '',
        flat: '',
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
        <div className="profile-form">
            <div className="container-xs">
                <div className="profile-form__upper">
                    <div className="profile-form__block">
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
                                <input
                                    className="profile-form__input"
                                    type="text"
                                    name="phone"
                                    value={profileInfo.phone}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="profile-form__field">
                                <label>Дополнительный телефон</label>
                                <input
                                    className="profile-form__input"
                                    type="text"
                                    name="additionalPhone"
                                    value={profileInfo.additionalPhone}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="profile-form__block">
                        <h3 className="profile__title profile__title--form">
                            <img src={address} alt="Контакты" />
                            Адрес доставки
                        </h3>
                        <div className="profile-form__fields">
                            <div className="profile-form__field">
                                <label>Город</label>
                                <input
                                    className="profile-form__input"
                                    type="text"
                                    name="city"
                                    value={profileInfo.city}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="profile-form__field">
                                <label>Улица</label>
                                <input
                                    className="profile-form__input"
                                    type="text"
                                    name="street"
                                    value={profileInfo.street}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="profile-form__field">
                                <label>Дом</label>
                                <input
                                    className="profile-form__input"
                                    type="text"
                                    name="house"
                                    value={profileInfo.house}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="profile-form__field">
                                <label>Квартира</label>
                                <input
                                    className="profile-form__input"
                                    type="text"
                                    name="flat"
                                    value={profileInfo.flat}
                                    onChange={changeHandler}
                                />
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
                <form className="profile-form__block" onSubmit={submitPassword}>
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
                <h3 className="profile__title profile__title--form">
                    Последние заказы
                </h3>
                <p>У вас еще не было покупок.</p>
            </div>
        </div>
    );
};

export default ProfileForm;
