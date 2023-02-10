import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../store/actions/contactsActions';
import Spinner from "../components/UI/Spinner/Spinner";

const AdminContacts = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.contacts);
    const loading = useSelector(state => state.contacts.loading);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className="admin-contacts">
            {loading && <Spinner/>}
            <div className="admin-contacts__upper">
                <h2 className="admin-contacts__title">Контакты магазина</h2>
                <Link className="button" to="/admin/edit-contacts">
                    Изменить
                </Link>
            </div>
            <div className="admin-contacts__contacts">
                <div className="admin-contacts__block">
                    <p className="admin-contacts__label">Телефон</p>
                    <div>
                        {contacts?.phone?.map((ph) => (
                            <p key={ph}>{ph}</p>
                        ))}
                    </div>
                </div>
                <div className="admin-contacts__block">
                    <p className="admin-contacts__label">Почта</p>
                    <div>
                        {contacts?.email?.map((em) => (
                            <p key={em}>{em}</p>
                        ))}
                    </div>
                </div>
                <div className="admin-contacts__block">
                    <p className="admin-contacts__label">Инстаграм</p>
                    <div>
                        <a href={contacts?.instagramLink}>
                            {contacts?.instagramLink}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminContacts;
