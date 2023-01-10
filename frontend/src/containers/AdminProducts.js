import React from 'react';
import {Link} from "react-router-dom";

const AdminProducts = () => {
    return (
        <div className='admin-products'>
            <div className='admin-products__upper'>
                <h2 className='admin-products__title'>Товары</h2>
                <Link className="button" to='/admin/add-product'>Добавить товар</Link>
            </div>
        </div>
    );
};

export default AdminProducts;