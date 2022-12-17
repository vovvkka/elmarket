import React from 'react';
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({show, closed, login, register, forgot}) => {
    let children = null;

    if (login) {
        children = (
            <>
                <div className="modal__header">
                    <div className="modal__logo">
                        <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_273_1693)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26442 6.20007C3.07978 6.20007 2.90991 6.01772 2.90991 5.7989C2.90991 5.63114 3.07978 5.46338 3.26442 5.46338H11.6987C11.9276 5.46338 12.0901 5.63114 12.0901 5.7989C12.0901 6.01772 11.9203 6.20007 11.6987 6.20007H3.26442Z" fill="#F05A22"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26442 9.80285C3.07978 9.80285 2.90991 9.67885 2.90991 9.46003C2.90991 9.29227 3.07978 9.12451 3.26442 9.12451H11.6987C11.9276 9.12451 12.0901 9.29227 12.0901 9.46003C12.0901 9.67885 11.9203 9.80285 11.6987 9.80285H3.26442Z" fill="#F05A22"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26442 13.4644C3.07978 13.4644 2.90991 13.2894 2.90991 13.1143C2.90991 12.9539 3.07978 12.7788 3.26442 12.7788H11.6987C11.9276 12.7788 12.0901 12.9539 12.0901 13.1143C12.0901 13.2894 11.9203 13.4644 11.6987 13.4644H3.26442Z" fill="#F05A22"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.46675 16.893C7.30427 16.893 7.1344 16.7252 7.1344 16.5064C7.1344 16.3387 7.30427 16.1709 7.46675 16.1709H11.6987C11.9276 16.1709 12.0901 16.3387 12.0901 16.5064C12.0901 16.7325 11.9202 16.893 11.6987 16.893H7.46675Z" fill="#F05A22"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.3796 2.19548C13.966 1.8089 13.4638 1.5682 12.836 1.5682H10.842V1.02115C10.842 0.736689 10.7386 0.503282 10.5539 0.27717C10.3767 0.116703 10.096 0 9.81536 0H5.19941C4.90399 0 4.62334 0.116703 4.45347 0.27717C4.23191 0.495988 4.10635 0.736689 4.10635 1.02115V1.5682H2.11226C1.55835 1.5682 1.02659 1.8089 0.635155 2.19548C0.228951 2.59664 0 3.09263 0 3.71991V19.6499C0 19.8322 0.169867 20 0.339734 20H14.6603C14.8301 20 15 19.8322 15 19.6499V3.71991C15 3.09263 14.771 2.59664 14.3796 2.19548ZM4.85229 1.02115C4.85229 0.962801 4.85229 0.853392 4.90399 0.79504C5.01477 0.736689 5.08863 0.671043 5.19941 0.671043H9.81536C9.92614 0.671043 9.98523 0.736689 10.0369 0.79504C10.0886 0.853392 10.1477 0.962801 10.1477 1.02115V1.5682H4.85229V1.02115ZM14.2688 19.3144H0.686854V3.71991C0.686854 3.31875 0.864106 2.93217 1.13737 2.70605C1.37371 2.4143 1.77253 2.31218 2.10487 2.31218H12.8287C13.2201 2.31218 13.5746 2.4143 13.8552 2.70605C14.0768 2.93217 14.2614 3.31875 14.2614 3.71991V19.3144H14.2688Z" fill="#423F40"/>
                            </g>
                        </svg>

                    </div>
                    <h2 className="modal__title">Авторизация</h2>
                </div>
                <div className="modal__body">
                    <div className="modal__input-block">
                        <label>E-mail</label>
                        <input
                            type="text"
                            className="modal__input"
                        />
                    </div>
                    <div className="modal__input-block">
                        <label>Пароль</label>
                        <input
                            type="text"
                            className="modal__input"
                        />
                    </div>
                    <div className="modal__links">
                        <p>Забыли пароль?</p>
                        <p>Регистрация</p>
                    </div>
                </div>
                <div className="modal__footer">
                    <button className="modal__btn">Войти</button>
                </div>
            </>
        )
    }

    return (
        <>
            <Backdrop show={show} clicked={closed}/>
            <div
                className="modal"
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0',
                }}
            >
                {children}
            </div>
        </>
    );
};

export default Modal;