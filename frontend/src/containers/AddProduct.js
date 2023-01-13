import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createCategory, fetchCategories} from "../store/actions/categoriesActions";
import {TreeSelect} from "antd";

const AddProduct = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const [product, setProduct] = useState({
        category: '',
        title: '',
        code: '',
        description: '',
        price: '',
        amount: '',
        isHit: false,
        isNovelty: false,
        discount: '',
        image: [],
    });


    useEffect(() => {
        dispatch(fetchCategories("?toTree=true"));
    }, [dispatch]);

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(product).forEach(key => {
            if (key === 'image') {
                product[key].forEach(item => {
                    formData.append(`image`, item);
                });
            } else {
                formData.append(key, product[key]);
            }
        });

        // dispatch(createCategory(formData));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onChangeCategory = c => setProduct(prev => ({...prev, category: c}));

    const onChangeChecked = e => {
        const {name} = e.target;

        setProduct(p => ({...p, [name]: !product[name]}));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const files = e.target.files;

        const toArr = Object.keys(files).map(key => files[key]);

        setProduct(prev => ({...prev, [name]: [...product.image, ...toArr]}));
    };

    return (
        <div className="container-sm">
            <div className="product-form">
                <h2 className="product-form__title">Добавить товар</h2>
                <form onSubmit={submitFormHandler}>
                    <div className="product-form__row">
                        <label>Категория</label>
                        <TreeSelect
                            value={product.category}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={categories}
                            placeholder="Please select"
                            className="product-form__select"
                            onChange={onChangeCategory}
                        />
                    </div>
                    <div className="product-form__row product-form__row--sm">
                        <label>Артикул</label>
                        <input
                            type="text"
                            name="code"
                            value={product.code}
                            onChange={(e) => handleChange(e)}
                            className="product-form__input-sm"
                        />
                    </div>
                    <div className="product-form__row">
                        <label>Название</label>
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="product-form__row">
                        <label>Описание</label>
                        <textarea
                            rows={5}
                            name="description"
                            value={product.description}
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
                                multiple
                            />
                            {product.image.length ? `Выбрано файлов - ${product.image.length}` : "Выберите файл"}
                        </label>
                    </div>
                    <div className='product-form__double'>
                        <div className="product-form__double-row">
                            <label>Цена</label>
                            <input
                                type="number"
                                name="price"
                                min={0}
                                value={product.price}
                                onChange={(e) => handleChange(e)}
                                className="product-form__input-xs"
                            />
                        </div>
                        <div className="product-form__double-row">
                            <label>Количество</label>
                            <input
                                type="number"
                                name="amount"
                                min={1}
                                value={product.amount}
                                onChange={(e) => handleChange(e)}
                                className="product-form__input-xs"
                            />
                        </div>
                    </div>
                    <div className="product-form__check">
                        <label>Хит</label>
                        <input
                            type="checkbox"
                            name="isHit"
                            checked={product.isHit}
                            onChange={onChangeChecked}
                        />
                    </div>
                    <div className="product-form__check">
                        <label>Новинка</label>
                        <input
                            type="checkbox"
                            name="isNovelty"
                            checked={product.isNovelty}
                            onChange={onChangeChecked}
                        />
                    </div>
                    <div className="product-form__row">
                        <label>Скидка (%)</label>
                        <input
                            type="number"
                            name="discount"
                            value={product.discount}
                            onChange={(e) => handleChange(e)}
                            className="product-form__input-xs"
                        />
                    </div>
                    <button className='button'>Добавить</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
