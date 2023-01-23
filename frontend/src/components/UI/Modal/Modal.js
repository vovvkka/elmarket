import React, {useState} from 'react';
import loginIcon from "../../../assets/svg/login.svg";
import registerIcon from "../../../assets/svg/register.svg";
import forgotIcon from "../../../assets/svg/forgot.png";
import Backdrop from "../Backdrop/Backdrop";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, loginUser, registerUser} from "../../../store/actions/usersActions";
import {addOrder} from "../../../store/actions/ordersActions";

const Modal = ({show, closed, login, register, forgot, order, changeModal}) => {
    const dispatch = useDispatch();
    const LoginError = useSelector(state => state.users.loginError);
    const RegisterError = useSelector(state => state.users.registerError);
    const products = useSelector(state => state.cart.products);
    const userData = useSelector(state => state.users.user);
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [customer, setCustomer] = useState({
        customer: "",
        phone: ""
    });

    const [email, setEmail] = useState('');

    const onCloseModal = () => {
        setUser({username: "", password: "", email: ""});
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
                amount: p.amount,
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

    const inputCustomerChangeHandler = e => {
        const {name, value} = e.target;
        setCustomer(prev => ({...prev, [name]: value}));
    };

    let children = null;
    let icon = null;


    if (login) {
        icon = loginIcon;

        children = (
            <div className="modal__body">
                {LoginError && (
                    <div className="alert alert--error">
                        Ошибка! {LoginError.error}
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
                {RegisterError && (
                    <div className="alert alert--error">
                        Error! {RegisterError.error}
                    </div>
                )}

                <div className="modal__input-block">
                    <label>ФИО</label>
                    <input

                        name="username"
                        autoComplete="off"
                        className="modal__input"
                        value={user?.username}
                        onChange={inputUserChangeHandler}
                    />
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
                </div>
            </div>
        );
    }

    if (order) {
        icon = registerIcon;

        children = (
            <div className="modal__body">
                {RegisterError && (
                    <div className="alert alert--error">
                        Error! {RegisterError.error}
                    </div>
                )}

                <div className="modal__input-block">
                    <label>ФИО</label>
                    <input
                        type="text"
                        name="customer"
                        autoComplete="off"
                        className="modal__input"
                        value={customer?.customer}
                        onChange={inputCustomerChangeHandler}
                    />
                </div>

                <div className="modal__input-block">
                    <label>Телефон</label>
                    <input
                        type="tel"
                        name="phone"
                        autoComplete="off"
                        className="modal__input"
                        value={customer?.phone}
                        onChange={inputCustomerChangeHandler}
                    />
                </div>
            </div>
        )
    }

    if (forgot) {
        icon = forgotIcon;

        children = (
            <div className="modal__body">
                {LoginError && (
                    <div className="alert alert--error">
                        Error! {LoginError.error}
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
                        <button className="modal__btn" type="submit">
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