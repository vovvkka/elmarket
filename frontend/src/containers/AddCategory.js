import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createCategory, fetchCategories} from "../store/actions/categoriesActions";
import {Select} from "antd";

const AddCategory = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const [categoryData, setCategoryData] = useState({
        category: '',
        title: '',
        image: '',
        isPopular: false,
    });

    useEffect(() => {
        dispatch(fetchCategories("?toOptions=true"));
    }, [dispatch]);

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(categoryData).forEach(key => {
            formData.append(key, categoryData[key]);
        });

        dispatch(createCategory(formData));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setCategoryData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onChangeCategory = c => setCategoryData(prev => ({...prev, category: c}));

    const onChangeChecked = e => {
        const {name} = e.target;

        setCategoryData(p => ({...p, [name]: !categoryData[name]}));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setCategoryData(prevState => ({...prevState, [name]: file}));
    };

    return (
        <div className="container-sm">
            <div className="category-form">
                <h2 className="category-form__title">Добавить категорию</h2>
                <form onSubmit={submitFormHandler}>
                    <div className="category-form__row">
                        <label>Категория</label>
                        <Select
                            value={categoryData.category}
                            onChange={onChangeCategory}
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
                    <div className="category-form__row">
                        <label>Фото</label>

                        <label className="custom-file-upload">
                            <input
                                type="file"
                                name="image"
                                className="custom-file-input"
                                onChange={fileChangeHandler}
                            />
                            {categoryData.image? "Файл выбран" : "Выберите файл"}
                        </label>
                    </div>
                    <div className="category-form__check">
                        <label>Популярный раздел</label>
                        <input
                            type="checkbox"
                            name="isPopular"
                            checked={categoryData.isPopular}
                            onChange={onChangeChecked}
                        />
                    </div>
                    <button className='button'>Добавить</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;