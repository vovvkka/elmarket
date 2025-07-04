import React, {useEffect, useState} from 'react';
import {Link, Route, useLocation} from 'react-router-dom';
import AdminProducts from './AdminProducts';
import products from '../assets/svg/box.svg';
import categories from '../assets/svg/category.svg';
import orders from '../assets/svg/orders.svg';
import contacts from '../assets/svg/contactsBook.svg';
import settings from '../assets/svg/settings.svg';
import AddProduct from './AddProduct';
import AdminCategories from "./AdminCategories";
import AddCategory from "./AddCategory";
import AdminOrders from "./AdminOrders";
import AdminContacts from "./AdminContacts";
import EditContacts from "./EditContacts";
import {fetchVisits} from "../store/actions/visitsActions";
import {useDispatch, useSelector} from "react-redux";
import Profile from "./Profile";

const listItems = [
    {
        path: ['/admin/products', '/admin/add-product', '/admin/edit-product'],
        icon: products,
        label: 'Товары',
    },
    {
        path: ['/admin/categories', '/admin/add-category', '/admin/edit-category'],
        icon: categories,
        label: 'Категории',
    },
    {
        path: ['/admin/orders'],
        icon: orders,
        label: 'Заказы',
    },
    {
        path: ['/admin/contacts', '/admin/edit-contacts'],
        icon: contacts,
        label: 'Контакты',
    },
    {
        path: ['/admin/settings'],
        icon: settings,
        label: 'Настройки',
    },
];

const Admin = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const visits = useSelector(state => state.visits.visits);
    const [path, setPath] = useState('');

    useEffect(() => {
        setPath(location.pathname);
        dispatch(fetchVisits());
    }, [location.pathname, dispatch]);

    return (
        <div className="admin">
            <div className="container-sm">
                <div className="admin__visits-block">
                    <h3 className="admin__visits">
                        Посещений сайта: {visits}
                    </h3>
                </div>
                <div className="admin__page">
                    <div className="admin__menu">
                        <ul>
                            {listItems.map((item, idx) => (
                                <li key={item.label + idx}>
                                    <Link
                                        to={item.path[0]}
                                        className={`admin__link ${
                                            item.path.includes(path)
                                                ? 'active'
                                                : ''
                                        }`}
                                    >
                                        <img
                                            width={30}
                                            src={item.icon}
                                            alt={item.label}
                                        />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Route path="/admin/products" component={AdminProducts} />
                    <Route path="/admin/add-product" component={AddProduct} />
                    <Route path="/admin/edit-product/:id" component={AddProduct} />
                    <Route path="/admin/categories" component={AdminCategories} />
                    <Route path="/admin/add-category" component={AddCategory} />
                    <Route path="/admin/edit-category/:id" component={AddCategory} />
                    <Route path="/admin/orders" component={AdminOrders} />
                    <Route path="/admin/contacts" component={AdminContacts} />
                    <Route path="/admin/edit-contacts" component={EditContacts} />
                    <Route path="/admin/settings" component={Profile}/>
                </div>
            </div>
        </div>
    );
};

export default Admin;
