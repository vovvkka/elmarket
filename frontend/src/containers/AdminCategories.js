import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/actions/categoriesActions";
import CategoriesTable from "../components/CategoriesTable/CategoriesTable";

const AdminCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategories("?toTable=true"));
    }, [dispatch]);

    return (
        <div className='admin-categories'>
            <div className='admin-categories__upper'>
                <h2 className='admin-categories__title'>Категории</h2>
                <Link className="button" to='/admin/add-category'>Добавить категорию</Link>
            </div>
            <CategoriesTable categories={categories}/>
        </div>
    );
};

export default AdminCategories;