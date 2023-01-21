import React, { useEffect, useState } from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import AdminProducts from './AdminProducts';
import products from '../assets/svg/box.svg';
import categories from '../assets/svg/category.svg';
import orders from '../assets/svg/orders.svg';
import contacts from '../assets/svg/contactsBook.svg';
import AddProduct from './AddProduct';
import AdminCategories from "./AdminCategories";
import AddCategory from "./AddCategory";
import AdminOrders from "./AdminOrders";

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
        path: ['/admin/contacts'],
        icon: contacts,
        label: 'Контакты',
    },
];

const Admin = () => {
    const location = useLocation();
    const [path, setPath] = useState('');

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    return (
        <div className="admin">
            <div className="container-sm">
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
                </div>
            </div>
        </div>
    );
};

export default Admin;
