import React, {useState} from 'react';

const NotActivatedWarning = () => {
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

    return (
        <div className="notActivatedWarning">
            <p className="notActivatedWarning__text">
                Ваш аккаунт не активирован! Пожалуйста активируйте аккаунт, для доступа ко всем возможностям.
                <span
                    className="notActivatedWarning__again"
                    onClick={timeOut}
                >
                    {!isClicked && "Отправить письмо повторно"}
                </span>
            </p>
        </div>
    );
};

export default NotActivatedWarning;