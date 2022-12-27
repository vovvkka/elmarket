import React, {useState} from 'react';
import Backdrop from "../Backdrop/Backdrop";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "../../../store/actions/usersActions";
import {addOrder} from "../../../store/actions/ordersActions";

const Modal = ({show, closed, login, register, forgot, order}) => {
    const dispatch = useDispatch();
    const LoginError = useSelector(state => state.users.loginError);
    const RegisterError = useSelector(state => state.users.registerError);
    const products = useSelector(state => state.cart.products);
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [customer, setCustomer] = useState({
        customer: "",
        phone: ""
    });

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
            const orderObj = { ...customer, order };

            await dispatch(addOrder(orderObj));
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
        icon = (
            <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_273_1693)">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M3.26442 6.20007C3.07978 6.20007 2.90991 6.01772 2.90991 5.7989C2.90991 5.63114 3.07978 5.46338 3.26442 5.46338H11.6987C11.9276 5.46338 12.0901 5.63114 12.0901 5.7989C12.0901 6.01772 11.9203 6.20007 11.6987 6.20007H3.26442Z"
                          fill="#F05A22"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M3.26442 9.80285C3.07978 9.80285 2.90991 9.67885 2.90991 9.46003C2.90991 9.29227 3.07978 9.12451 3.26442 9.12451H11.6987C11.9276 9.12451 12.0901 9.29227 12.0901 9.46003C12.0901 9.67885 11.9203 9.80285 11.6987 9.80285H3.26442Z"
                          fill="#F05A22"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M3.26442 13.4644C3.07978 13.4644 2.90991 13.2894 2.90991 13.1143C2.90991 12.9539 3.07978 12.7788 3.26442 12.7788H11.6987C11.9276 12.7788 12.0901 12.9539 12.0901 13.1143C12.0901 13.2894 11.9203 13.4644 11.6987 13.4644H3.26442Z"
                          fill="#F05A22"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M7.46675 16.893C7.30427 16.893 7.1344 16.7252 7.1344 16.5064C7.1344 16.3387 7.30427 16.1709 7.46675 16.1709H11.6987C11.9276 16.1709 12.0901 16.3387 12.0901 16.5064C12.0901 16.7325 11.9202 16.893 11.6987 16.893H7.46675Z"
                          fill="#F05A22"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M14.3796 2.19548C13.966 1.8089 13.4638 1.5682 12.836 1.5682H10.842V1.02115C10.842 0.736689 10.7386 0.503282 10.5539 0.27717C10.3767 0.116703 10.096 0 9.81536 0H5.19941C4.90399 0 4.62334 0.116703 4.45347 0.27717C4.23191 0.495988 4.10635 0.736689 4.10635 1.02115V1.5682H2.11226C1.55835 1.5682 1.02659 1.8089 0.635155 2.19548C0.228951 2.59664 0 3.09263 0 3.71991V19.6499C0 19.8322 0.169867 20 0.339734 20H14.6603C14.8301 20 15 19.8322 15 19.6499V3.71991C15 3.09263 14.771 2.59664 14.3796 2.19548ZM4.85229 1.02115C4.85229 0.962801 4.85229 0.853392 4.90399 0.79504C5.01477 0.736689 5.08863 0.671043 5.19941 0.671043H9.81536C9.92614 0.671043 9.98523 0.736689 10.0369 0.79504C10.0886 0.853392 10.1477 0.962801 10.1477 1.02115V1.5682H4.85229V1.02115ZM14.2688 19.3144H0.686854V3.71991C0.686854 3.31875 0.864106 2.93217 1.13737 2.70605C1.37371 2.4143 1.77253 2.31218 2.10487 2.31218H12.8287C13.2201 2.31218 13.5746 2.4143 13.8552 2.70605C14.0768 2.93217 14.2614 3.31875 14.2614 3.71991V19.3144H14.2688Z"
                          fill="#423F40"/>
                </g>
            </svg>
        );

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
                    <p>Забыли пароль?</p>
                    <p>Регистрация</p>
                </div>
            </div>
        );
    }

    if (register) {
        icon = (
            <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_273_1690)">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M14.3991 0.608226C14.0867 0.217511 13.6004 0 13.0588 0H3.2301C2.70032 0 2.20612 0.217511 1.88983 0.608226C1.50633 0.986856 1.30074 1.4823 1.30074 2.02608V3.56074H0.332103C0.170005 3.55671 0 3.72186 0 3.88298C0 4.11257 0.170005 4.27369 0.332103 4.27369H1.30074V7.27857H0.332103C0.170005 7.27857 0 7.43969 0 7.61692C0 7.8304 0.170005 7.99152 0.332103 7.99152H1.30074V10.9964H0.332103C0.170005 11.0004 0 11.1696 0 11.3307C0 11.5482 0.170005 11.7093 0.332103 11.7093H1.30074V14.7263H0.332103C0.170005 14.7303 0 14.8915 0 15.0526C0 15.2701 0.170005 15.4312 0.332103 15.4312H1.30074V16.9659C1.30074 17.5177 1.50633 18.0011 1.88983 18.3918C2.20612 18.7704 2.70032 19 3.22615 19H13.0548C13.5965 19 14.0867 18.7704 14.3991 18.3918C14.7746 18.0011 14.996 17.5137 14.996 16.9659V2.02608C15 1.4823 14.7746 0.986856 14.3991 0.608226ZM14.3556 16.9659C14.3556 17.3566 14.1974 17.6788 13.9839 17.8963C13.7072 18.1783 13.3909 18.3434 13.0588 18.3434H3.2301C2.90986 18.3434 2.58171 18.1823 2.31682 17.8963C2.10332 17.6788 1.94518 17.3526 1.94518 16.9659V15.4312H2.31682C2.52636 15.4312 2.63311 15.2701 2.63311 15.0526C2.63311 14.8915 2.52636 14.7263 2.31682 14.7263H1.94518V11.7093H2.31682C2.52636 11.7093 2.63311 11.5442 2.63311 11.3307C2.63311 11.1696 2.52636 10.9964 2.31682 10.9964H1.94518V7.99152H2.31682C2.52636 7.99152 2.63311 7.8304 2.63311 7.61692C2.63311 7.43969 2.52636 7.27857 2.31682 7.27857H1.94518V4.27369H2.31682C2.52636 4.27369 2.63311 4.11257 2.63311 3.88298C2.63311 3.72186 2.52636 3.56074 2.31682 3.56074H1.94518V2.02608C1.94518 1.64745 2.10332 1.30909 2.31682 1.09561C2.57775 0.829765 2.9059 0.664617 3.2301 0.664617H13.0588C13.3869 0.664617 13.7072 0.829765 13.9839 1.09561C14.2014 1.31312 14.3556 1.64745 14.3556 2.02608V16.9659Z"
                          fill="#423F40"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M12.5291 2.68284C12.4223 2.52172 12.2642 2.46533 12.0388 2.46533H4.25023C4.03674 2.46533 3.87464 2.52172 3.7758 2.68284C3.6137 2.7916 3.55835 2.95272 3.55835 3.17829V7.32711C3.55835 7.56073 3.6137 7.72185 3.7758 7.83061C3.87859 7.99173 4.03674 8.04812 4.25023 8.04812H12.0388C12.2642 8.04812 12.4223 7.99173 12.5291 7.83061C12.6319 7.72185 12.7386 7.56073 12.7386 7.32711V3.17829C12.7386 2.95272 12.6279 2.7916 12.5291 2.68284ZM12.0863 7.60907C12.0863 7.60907 12.0863 7.60907 12.0388 7.66949H4.25023C4.25023 7.66949 4.25023 7.66949 4.19488 7.66949C4.19488 7.60907 4.19488 7.60907 4.19488 7.60907V3.18231V3.12995C4.25023 3.12995 4.25023 3.12995 4.25023 3.12995H12.0388C12.0863 3.12995 12.0863 3.18634 12.0863 3.18634V7.60907Z"
                          fill="#F05A22"/>
                </g>
            </svg>

        );

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
        icon = (
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.359 0.640237C15.0258 0.228959 14.5071 0 13.9294 0H3.44544C2.88034 0 2.35319 0.228959 2.01581 0.640237C1.60675 1.0388 1.38745 1.56031 1.38745 2.13271V3.74815H0.354244C0.181339 3.74391 0 3.91774 0 4.08734C0 4.32902 0.181339 4.49862 0.354244 4.49862H1.38745V7.66165H0.354244C0.181339 7.66165 0 7.83125 0 8.01781C0 8.24253 0.181339 8.41213 0.354244 8.41213H1.38745V11.5752H0.354244C0.181339 11.5794 0 11.7575 0 11.9271C0 12.156 0.181339 12.3256 0.354244 12.3256H1.38745V15.5014H0.354244C0.181339 15.5056 0 15.6752 0 15.8448C0 16.0738 0.181339 16.2434 0.354244 16.2434H1.38745V17.8588C1.38745 18.4397 1.60675 18.9485 2.01581 19.3598C2.35319 19.7583 2.88034 20 3.44122 20H13.9251C14.5029 20 15.0258 19.7583 15.359 19.3598C15.7596 18.9485 15.9958 18.4354 15.9958 17.8588V2.13271C16 1.56031 15.7596 1.0388 15.359 0.640237ZM15.3126 17.8588C15.3126 18.2701 15.1439 18.6093 14.9162 18.8382C14.621 19.135 14.2836 19.3089 13.9294 19.3089H3.44544C3.10385 19.3089 2.75382 19.1393 2.47127 18.8382C2.24354 18.6093 2.07486 18.2658 2.07486 17.8588V16.2434H2.47127C2.69478 16.2434 2.80865 16.0738 2.80865 15.8448C2.80865 15.6752 2.69478 15.5014 2.47127 15.5014H2.07486V12.3256H2.47127C2.69478 12.3256 2.80865 12.1518 2.80865 11.9271C2.80865 11.7575 2.69478 11.5752 2.47127 11.5752H2.07486V8.41213H2.47127C2.69478 8.41213 2.80865 8.24253 2.80865 8.01781C2.80865 7.83125 2.69478 7.66165 2.47127 7.66165H2.07486V4.49862H2.47127C2.69478 4.49862 2.80865 4.32902 2.80865 4.08734C2.80865 3.91774 2.69478 3.74815 2.47127 3.74815H2.07486V2.13271C2.07486 1.73415 2.24354 1.37799 2.47127 1.15328C2.7496 0.873437 3.09963 0.699597 3.44544 0.699597H13.9294C14.2794 0.699597 14.621 0.873437 14.9162 1.15328C15.1481 1.38223 15.3126 1.73415 15.3126 2.13271V17.8588Z" fill="#423F40"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.3642 2.82369C13.2503 2.65409 13.0817 2.59473 12.8413 2.59473H4.53342C4.30569 2.59473 4.13279 2.65409 4.02736 2.82369C3.85445 2.93817 3.79541 3.10776 3.79541 3.3452V7.71239C3.79541 7.95831 3.85445 8.1279 4.02736 8.24238C4.137 8.41198 4.30569 8.47134 4.53342 8.47134H12.8413C13.0817 8.47134 13.2503 8.41198 13.3642 8.24238C13.4739 8.1279 13.5877 7.95831 13.5877 7.71239V3.3452C13.5877 3.10776 13.4696 2.93817 13.3642 2.82369ZM12.8919 8.00918C12.8919 8.00918 12.8919 8.00919 12.8413 8.07279H4.53342C4.53342 8.07279 4.53342 8.07279 4.47438 8.07279C4.47438 8.00919 4.47438 8.00918 4.47438 8.00918V3.34944V3.29432C4.53342 3.29432 4.53342 3.29432 4.53342 3.29432H12.8413C12.8919 3.29432 12.8919 3.35368 12.8919 3.35368V8.00918Z" fill="#F05A22"/>
            </svg>
        );

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
                            {icon}
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