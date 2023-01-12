import React from 'react';
import {Link} from "react-router-dom";

const AdminCategories = () => {
    return (
        <div className='admin-categories'>
            <div className='admin-categories__upper'>
                <h2 className='admin-categories__title'>Категории</h2>
                <Link className="button" to='/admin/add-category'>Добавить категория</Link>
            </div>
        </div>
    );
};

export default AdminCategories;