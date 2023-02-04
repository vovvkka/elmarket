import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createCategory, editCategory, fetchCategories, fetchCategory,} from '../store/actions/categoriesActions';
import {Select} from 'antd';
import {useLocation} from 'react-router-dom';
import {clearCategoryError} from "../store/slices/categoriesSlice";

const AddCategory = ({ match }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const categories = useSelector((state) => state.categories.categories);
    const category = useSelector((state) => state.categories.category);
    const error = useSelector(state => state.categories.createError);

    const [categoryData, setCategoryData] = useState({
        parentCategory: '',
        title: '',
        image: '',
        isPopular: false,
    });

    const [options, setOptions] = useState([]);

    useEffect(() => {
        dispatch(fetchCategories('?toOptions=true'));

        return () => {
            dispatch(clearCategoryError());
        };
    }, [dispatch]);

    useEffect(() => {
        if (!!match.params.id && location.pathname !== '/admin/add-category') {
            dispatch(fetchCategory(match.params.id));
        }
    }, [dispatch, match.params.id, location.pathname]);

    useEffect(() => {
        if (category && location.pathname !== '/admin/add-category') {
            setCategoryData(category);
        }
    }, [location, category]);

    useEffect(() => {
        if (categories) {
            setOptions(() => {
                return [
                    { label: 'Без категории', value: 'Без категории' },
                    ...categories,
                ];
            });
        }
    }, [categories]);

    const submitFormHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(categoryData).forEach((key) => {
            formData.append(key, categoryData[key]);
        });

        if (!!match.params.id) {
            dispatch(editCategory(match.params.id, formData));
        } else {
            dispatch(createCategory(formData));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCategoryData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onChangeCategory = (c) =>
        setCategoryData((prev) => ({ ...prev, parentCategory: c }));

    const onChangeChecked = (e) => {
        const { name } = e.target;

        setCategoryData((p) => ({ ...p, [name]: !categoryData[name] }));
    };

    const fileChangeHandler = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];

        setCategoryData((prevState) => ({ ...prevState, [name]: file }));
    };

    return (
        <div className="container-sm">
            <div className="category-form">
                <h2 className="category-form__title">
                    {match.params.id ? 'Редактировать' : 'Добавить'} категорию
                </h2>
                <p className="fieldError">{error && "* Заполните все поля"}</p>
                <form onSubmit={submitFormHandler}>
                    <div className="category-form__row">
                        <label>Категория</label>
                        <Select
                            value={categoryData.parentCategory}
                            onChange={onChangeCategory}
                            options={options}
                            className="category-form__select"
                        />
                    </div>
                    <div className="category-form__row">
                        <label>* Название</label>
                        <input
                            type="text"
                            name="title"
                            className="category-form__input-xl"
                            value={categoryData.title}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    {(categoryData.parentCategory === 'Без категории' ||
                        !categoryData.parentCategory) && (
                        <div className="category-form__row">
                            <label>Фото</label>

                            <label className="custom-file-upload">
                                <input
                                    type="file"
                                    name="image"
                                    className="custom-file-input"
                                    onChange={fileChangeHandler}
                                />
                                {categoryData.image
                                    ? 'Файл выбран'
                                    : 'Выберите файл'}
                            </label>
                        </div>
                    )}
                    <div className="category-form__check">
                        <label>Популярный раздел</label>
                        <input
                            type="checkbox"
                            name="isPopular"
                            checked={categoryData.isPopular}
                            onChange={onChangeChecked}
                        />
                    </div>
                    <button className="button">
                        {match.params.id ? 'Сохранить' : 'Добавить'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
