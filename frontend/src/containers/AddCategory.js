import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/actions/categoriesActions";
import {Select} from "antd";

const AddCategory = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const [categoryData, setCategoryData] = useState({
        category: '',
        title: '',
    });

    useEffect(() => {
        dispatch(fetchCategories("?toOptions=true"));
    }, [dispatch]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setCategoryData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onChange = (newValue) => {
        setCategoryData(prevState => ({...prevState, category: newValue}));
    };

    return (
        <div className="container-sm">
            <div className="category-form">
                <h2 className="category-form__title">Добавить категорию</h2>
                <form>
                    <div className="category-form__row">
                        <label>Категория</label>
                        <Select
                            value={categoryData.category}
                            onChange={onChange}
                            options={categories}
                            className="category-form__select"
                        />
                    </div>
                    <div className="category-form__row">
                        <label>Название</label>
                        <input
                            type="text"
                            name="title"
                            className="category-form__input-xl"
                            value={categoryData.title}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <button className='button'>Добавить</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;