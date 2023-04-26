import React, {useEffect, useState} from 'react';
import loginIcon from "../../../assets/svg/login.svg";
import registerIcon from "../../../assets/svg/register.svg";
import forgotIcon from "../../../assets/svg/forgot.png";
import InputMask from 'react-input-mask';
import Backdrop from "../Backdrop/Backdrop";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, getProfile, loginUser, registerUser} from "../../../store/actions/usersActions";
import {addOrder} from "../../../store/actions/ordersActions";

const Modal = ({show, closed, login, register, forgot, order, changeModal}) => {
    const dispatch = useDispatch();
    const loginError = useSelector(state => state.users.loginError);
    const registerError = useSelector(state => state.users.registerError);
    const forgotError = useSelector(state => state.users.forgotError);
    const orderError = useSelector(state => state.orders.createError);
    const orderLoading = useSelector(state => state.orders.loading);
    const products = useSelector(state => state.cart.products);
    const profile = useSelector(state => state.users.profile);
    const userData = useSelector(state => state.users.user);
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        isIndividual: true,
    });

    const [customer, setCustomer] = useState({
        customer: "",
        phone: "",
        address: "",
        companyDesc: "",
        isIndividual: true,
        payment: "Optima",
    });

    const [email, setEmail] = useState('');


    useEffect(() => {
        if (order && userData) {
            dispatch(getProfile());
        }
    }, [dispatch, order, userData]);

    useEffect(() => {
        if (profile?.phone) setCustomer(prev => ({...prev, phone: profile.phone}));
        if (profile?.username) setCustomer(prev => ({...prev, customer: profile.username}));
        if (profile?.companyDesc) setCustomer(prev => ({...prev, customer: profile.companyDesc}));
        if (typeof profile?.isIndividual === "boolean") setCustomer(prev => ({...prev, isIndividual: profile.isIndividual}));
    }, [profile]);

    const onCloseModal = () => {
        setUser({username: "", password: "", email: ""});
        setCustomer({customer: '', phone: ''});
        closed();
    };

    const submitFormHandler = async e => {
        e.preventDefault();

        if (login) {
            await dispatch(loginUser({...user}));
            onCloseModal();
        }

        if (register) {
            await dispatch(registerUser({...user}));
            onCloseModal();
        }

        if (order) {
            const order = products.map(p => ({
                product: p._id,
                quantity: p.quantity,
            }));

            const orderObj = {...customer, order};

            if (userData) orderObj.userId = userData._id;

            await dispatch(addOrder(orderObj));
        }

        if (forgot) {
            await dispatch(forgotPassword(email));
            onCloseModal();
        }
    };

    const inputUserChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const handleRadioChange = e => {
        const isIndividual = e.target.value === "individual";
        setUser((prevUser) => ({ ...prevUser, isIndividual }));
    };

    const inputCustomerChangeHandler = e => {
        const {name, value} = e.target;
        setCustomer(prev => ({...prev, [name]: value}));
    };

    const getRegisterFieldError = fieldName => {
        try {
            return registerError.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    const getOrderFieldError = fieldName => {
        try {
            return orderError.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    let children = null;
    let icon = null;


    if (login) {
        icon = loginIcon;

        children = (
            <div className="modal__body">
                {loginError && (
                    <div className="alert alert--error">
                        Ошибка! {loginError.error}
                    </div>
                )}

                <div className="modal__input-block">
                    <label>E-mail</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        className="modal__input"
                        value={user.email}
                        onChange={inputUserChangeHandler}
                    />
                </div>
                <div className="modal__input-block">
                    <label>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        className="modal__input"
                        value={user.password}
                        onChange={inputUserChangeHandler}
                    />
                </div>
                <div className="modal__links">
                    <p
                        className="modal__link"
                        onClick={() => changeModal("forgot")}
                    >
                        Забыли пароль?
                    </p>
                    <p
                        className="modal__link"
                        onClick={() => changeModal("register")}
                    >
                        Регистрация
                    </p>
                </div>
            </div>
        );
    }

    if (register) {
        icon = registerIcon;

        children = (
            <div className="modal__body">
                <div className="modal__choose-type">
                    <label>
                        <input
                            type="radio"
                            name="isIndividual"
                            value="individual"
                            className="modal__choose-radio"
                            onChange={handleRadioChange}
                            checked={user.isIndividual}
                        />
                        Физ. лицо
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="isIndividual"
                            value="company"
                            className="modal__choose-radio"
                            onChange={handleRadioChange}
                            checked={!user.isIndividual}
                        />
                        Юр. лицо
                    </label>
                </div>
                <div className="modal__input-block">
                    <label>{user.isIndividual ? "ФИО" : "Информация о компании"}</label>
                    <input
                        name={user.isIndividual? "username" : "companyDesc"}
                        autoComplete="off"
                        className="modal__input"
                        value={user.isIndividual? user?.username : user?.companyDesc}
                        onChange={inputUserChangeHandler}
                    />
                    <p className="modal__error">{getRegisterFieldError(user.isIndividual? "username" : "companyDesc")}</p>
                </div>

                <div className="modal__input-block">
                    <label>E-mail</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        className="modal__input"
                        value={user?.email}
                        onChange={inputUserChangeHandler}
                    />
                    <p className="modal__error">{getRegisterFieldError("email")}</p>
                </div>

                <div className="modal__input-block">
                    <label>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        className="modal__input"
                        value={user?.password}
                        onChange={inputUserChangeHandler}
                    />
                    <p className="modal__error">{getRegisterFieldError("password")}</p>
                </div>
            </div>
        );
    }

    if (order) {
        icon = registerIcon;

        children = (
            <div className="modal__body">
                <div className="modal__input-block">
                    <label>{customer.isIndividual? "ФИО" : "Информация о компании"}</label>
                    <input
                        type="text"
                        name="customer"
                        autoComplete="off"
                        className="modal__input"
                        value={customer?.customer}
                        onChange={inputCustomerChangeHandler}
                    />
                    <p className="modal__error">{getOrderFieldError("customer")}</p>
                </div>

                <div className="modal__input-block">
                    <label>Телефон</label>
                    <InputMask mask="+\9\96(999)99-99-99" value={customer?.phone} onChange={inputCustomerChangeHandler}>
                        {
                            inputProps => <input
                                {...inputProps}
                                type="tel"
                                className="modal__input"
                                name="phone"
                            />
                        }
                    </InputMask>
                    <p className="modal__error">{getOrderFieldError("phone")}</p>
                </div>
                <div className="modal__input-block">
                    <label>Адрес Доставки</label>
                    <input
                        type="text"
                        name="address"
                        autoComplete="off"
                        className="modal__input"
                        value={customer?.address}
                        onChange={inputCustomerChangeHandler}
                    />
                    <p className="modal__error">{getOrderFieldError("address")}</p>
                </div>
                <div className="modal__input-block">
                    <label>Тип оплаты</label>
                    <label className="modal__payment-label">
                        <input
                            type="radio"
                            name="payment"
                            autoComplete="off"
                            className="modal__input"
                            value="Optima"
                            onChange={inputCustomerChangeHandler}
                            checked={customer?.payment === "Optima"}
                        />
                        Оптима Банк
                    </label>
                    <label className="modal__payment-label">
                        <input
                            type="radio"
                            name="payment"
                            autoComplete="off"
                            className="modal__input"
                            value="MBank"
                            onChange={inputCustomerChangeHandler}
                            checked={customer?.payment === "MBank"}
                        />
                        О!Деньги | МБанк | Элсом
                    </label>

                </div>
            </div>
        )
    }

    if (forgot) {
        icon = forgotIcon;

        children = (
            <div className="modal__body">
                {loginError && (
                    <div className="alert alert--error">
                        Ошибка! {loginError?.error}
                    </div>
                )}

                <div className="modal__input-block">
                    <label>E-mail</label>
                    <input
                        type="email"
                        autoComplete="off"
                        className="modal__input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p className="modal__error">{forgotError?.message}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Backdrop show={show} clicked={onCloseModal}/>
            <div
                className="modal"
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0',
                }}
            >
                <form autoComplete="off" onSubmit={submitFormHandler}>
                    <div className="modal__header">
                        <div className="modal__logo">
                            <img src={icon} alt="Icon" className={forgot ? "modal__forgot" : ""}/>
                        </div>
                        <h2 className="modal__title">
                            {login && "Авторизация"}
                            {register && "Регистрация"}
                            {forgot && "Восстановление пароля"}
                            {order && "Оформление заказа"}
                        </h2>
                    </div>

                    {children}

                    <div className="modal__footer">
                        <button className="modal__btn" type="submit" disabled={orderLoading}>
                            {login && "Войти"}
                            {register && "Зарегестрироваться"}
                            {forgot && "Восстановление пароля"}
                            {order && "Заказать"}
                        </button>
                    </div>

                    {register && (
                        <p className="modal__footer-privacy">Нажимая кнопку Зарегистрироваться Я соглашаюсь с обработкой
                            персональных данных и Политикой конфиденциальности.</p>
                    )}
                </form>
            </div>
        </>
    );
};

export default Modal;