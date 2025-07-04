import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CategoriesTable from "../components/CategoriesTable/CategoriesTable";
import Paginate from "../components/UI/Paginate/Paginate";
import {fetchCategories} from "../store/actions/categoriesActions";
import Spinner from "../components/UI/Spinner/Spinner";
import {clearAll} from "../store/slices/categoriesSlice";

const AdminCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const loading = useSelector(state => state.categories.loading);

    useEffect(() => {
        dispatch(clearAll());
    }, [dispatch]);

    const onSearch = val => {
        dispatch(fetchCategories("?toTable=true&search=" + val));
    };

    return (
        <div className='admin-categories'>
            {loading && <Spinner/>}
            <div className='admin-categories__upper'>
                <h2 className='admin-categories__title'>Категории</h2>
                <Link className="button" to='/admin/add-category'>Добавить категорию</Link>
            </div>
            <input
                type="search"
                placeholder="Введите название"
                onKeyPress={e => e.key === "Enter" && onSearch(e.target.value)}
                className="admin-categories__search"
            />
            <CategoriesTable categories={categories}/>
            <div className="admin-categories__paginate">
                <Paginate isCategories limit={4}/>
            </div>
        </div>
    );
};

export default AdminCategories;