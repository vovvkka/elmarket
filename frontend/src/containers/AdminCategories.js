import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import CategoriesTable from "../components/CategoriesTable/CategoriesTable";
import Paginate from "../components/UI/Paginate/Paginate";

const AdminCategories = () => {
    const categories = useSelector((state) => state.categories.categories);

    return (
        <div className='admin-categories'>
            <div className='admin-categories__upper'>
                <h2 className='admin-categories__title'>Категории</h2>
                <Link className="button" to='/admin/add-category'>Добавить категорию</Link>
            </div>
            <CategoriesTable categories={categories}/>
            <div className="admin-categories__paginate">
                <Paginate isCategories limit={4}/>
            </div>
        </div>
    );
};

export default AdminCategories;