import React, {useEffect, useState} from 'react';
import contacts from '../../../assets/svg/contacts.svg';
import address from '../../../assets/svg/address.svg';
import pen from '../../../assets/svg/pen.svg';

const ProfileForm = ({ onSubmit, profile }) => {
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

    useEffect(() => {
        if (profile) {
            Object.keys(profile).forEach(key => {
                setProfileInfo(prev => ({...prev, [key]: profile[key]}));
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
                <button className="profile-form__button" onClick={() => onSubmit(profileInfo)}>Сохранить</button>
            </div>
            <hr className="profile-form__divider" />
            <div className="container-xs">
                <div className="profile-form__block">
                    <h3 className="profile__title profile__title--form">
                        <img src={pen} alt="Контакты" />
                        Контактные данные
                    </h3>
                    <div className="profile-form__fields">
                        <div className="profile-form__field">
                            <label>Текущий пароль</label>
                            <input
                                className="profile-form__input"
                                type="text"
                                name="surname"
                            />
                        </div>
                        <div className="profile-form__field">
                            <label>Новый пароль</label>
                            <input
                                className="profile-form__input"
                                type="text"
                                name="email"
                            />
                        </div>
                        <div className="profile-form__field">
                            <label>Новый пароль повторно</label>
                            <input
                                className="profile-form__input"
                                type="text"
                                name="phone"
                            />
                        </div>
                    </div>
                    <button className="profile-form__button">Сохранить</button>
                </div>
                <h3 className="profile__title profile__title--form">
                    Последние заказы
                </h3>
                <p>У вас еще не было покупок.</p>
            </div>
        </div>
    );
};

export default ProfileForm;
