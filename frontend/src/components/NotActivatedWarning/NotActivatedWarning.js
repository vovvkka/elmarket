import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {resendActivationLink} from "../../store/actions/usersActions";

const NotActivatedWarning = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const [isClicked, setIsClicked] = useState(false);

    const timeOut = () => {
        if (!isClicked) {
            let sec = 10;
            setIsClicked(true);

            const a = setInterval(() => {
                sec -= 1;

                if (sec === 0) {
                    clearInterval(a);
                    setIsClicked(false);
                }
            }, 1000);
        }
    };

    const resend = () => {
        const { email, activationLink } = user;
        dispatch(resendActivationLink({email, activationLink}));
    };

    return (
        <div className="notActivatedWarning">
            <p className="notActivatedWarning__text">
                Ваш аккаунт не активирован! Пожалуйста активируйте аккаунт, для доступа ко всем возможностям.
                <span
                    className="notActivatedWarning__again"
                    onClick={() => {
                        timeOut();
                        resend();
                    }}
                >
                    {!isClicked && "Отправить письмо повторно"}
                </span>
            </p>
        </div>
    );
};

export default NotActivatedWarning;