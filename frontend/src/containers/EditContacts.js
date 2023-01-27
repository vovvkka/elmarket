import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editContacts } from '../store/actions/contactsActions';
import deleteIcon from '../assets/svg/delete.svg';
import {clearContactsError} from "../store/slices/contactsSlice";

const EditContacts = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.contacts);
    const error = useSelector(state => state.contacts.error);

    const [state, setState] = useState({
        email: [],
        phone: [],
        instagramLink: '',
    });

    useEffect(() => {
        if (contacts) {
            setState((prevState) => ({
                ...prevState,
                email: contacts.email,
                phone: contacts.phone,
                instagramLink: contacts.instagramLink,
            }));
        }

        return () => {
            dispatch(clearContactsError());
        }
    }, [dispatch, contacts]);

    const multipleChangeHandler = (e, index) => {
        const { name, value } = e.target;

        setState((prev) => {
            const newArr = prev[name].map((item, i) => {
                if (index === i) {
                    return value;
                }

                return item;
            });

            return {
                ...prev,
                [name]: newArr,
            };
        });
    };

    const addInputHandler = (name) => {
        setState((prev) => ({
            ...prev,
            [name]: [...prev[name], ''],
        }));
    };

    const deleteInput = (index, name) => {
        setState((prev) => {
            const arrCopy = [...prev[name]];
            arrCopy.splice(index, 1);

            return {
                ...prev,
                [name]: arrCopy,
            };
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(editContacts({ ...state }));
    };

    return (
        <form className="admin-contacts__edit" onSubmit={onSubmitHandler}>
            <h2>Редактировать контакты</h2>
            <p className="fieldError">{error && "* Заполните все поля"}</p>
            <div className="admin-contacts__row">
                <label>* Телефон</label>
                <div>
                    {state.phone?.map((ph, index) => (
                        <div className="admin-contacts__input-field">
                            <input
                                type="text"
                                name="phone"
                                value={state.phone[index]}
                                onChange={(e) =>
                                    multipleChangeHandler(e, index)
                                }
                                required
                            />
                            {index > 0 ? (
                                <button
                                    className="admin-contacts__delete"
                                    type="button"
                                    name="phone"
                                    onClick={(e) =>
                                        deleteInput(index, e.currentTarget.name)
                                    }
                                >
                                    <img
                                        src={deleteIcon}
                                        alt="Удалить"
                                        width={25}
                                    />
                                </button>
                            ) : null}
                        </div>
                    ))}
                    <button
                        className="button admin-contacts__button"
                        name="phone"
                        onClick={(e) => addInputHandler(e.target.name)}
                    >
                        Добавить телефон
                    </button>
                </div>
            </div>
            <div className="admin-contacts__row">
                <label>* Почта</label>
                <div>
                    {state.email?.map((ph, index) => (
                        <div className="admin-contacts__input-field">
                            <input
                                type="text"
                                name="email"
                                value={state.email[index]}
                                onChange={(e) =>
                                    multipleChangeHandler(e, index)
                                }
                                required
                            />
                            {index > 0 ? (
                                <button
                                    className="admin-contacts__delete"
                                    type="button"
                                    name="email"
                                    onClick={(e) =>
                                        deleteInput(index, e.currentTarget.name)
                                    }
                                >
                                    <img
                                        src={deleteIcon}
                                        alt="Удалить"
                                        width={25}
                                    />
                                </button>
                            ) : null}
                        </div>
                    ))}
                    <button
                        className="button admin-contacts__button"
                        name="email"
                        onClick={(e) => addInputHandler(e.target.name)}
                    >
                        Добавить почту
                    </button>
                </div>
            </div>
            <div className="admin-contacts__row">
                <label>Инстаграм</label>
                <div>
                    <div className="admin-contacts__input-field">
                        <input
                            type="text"
                            name="instagramLink"
                            value={state.instagramLink}
                            onChange={(e) =>
                                setState((prev) => ({
                                    ...prev,
                                    instagramLink: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
            </div>
            <button className="button" type="submit">
                Сохранить
            </button>
        </form>
    );
};

export default EditContacts;
