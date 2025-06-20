import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../store/actions/categoriesActions';
import {TreeSelect} from 'antd';
import {createProduct, editProduct, fetchOne,} from '../store/actions/productsActions';
import {clearProductError} from '../store/slices/productsSlice';

const AddProduct = ({ match }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const oneProduct = useSelector((state) => state.products.product);
    const error = useSelector((state) => state.products.createError);
    const [product, setProduct] = useState({
        category: '',
        title: '',
        code: '',
        description: '',
        price: '',
        amount: '',
        isHit: false,
        isNovelty: false,
        discount: 0,
        unit: 'шт.',
        amountForDiscount: 1,
        image: [],
    });

    useEffect(() => {
        dispatch(fetchCategories('?toTree=true'));

        return () => {
            dispatch(clearProductError());
        };
    }, [dispatch]);

    useEffect(() => {
        if (!!match.params.id) {
            dispatch(fetchOne(match.params.id, 'admin'));
        }
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (oneProduct) {
            setProduct(oneProduct);
        }
    }, [oneProduct]);

    const submitFormHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(product).forEach((key) => {
            if (key === 'image') {
                product[key].forEach((item) => {
                    formData.append(`image`, item);
                });
            } else {
                formData.append(key, product[key]);
            }
        });

        if (!!match.params.id) {
            dispatch(editProduct(match.params.id, formData));
        } else {
            dispatch(createProduct(formData));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onChangeCategory = (c) =>
        setProduct((prev) => ({ ...prev, category: c }));

    const onChangeChecked = (e) => {
        const { name } = e.target;

        setProduct((p) => ({ ...p, [name]: !product[name] }));
    };

    const fileChangeHandler = (e) => {
        const name = e.target.name;
        const files = e.target.files;

        const toArr = Object.keys(files).map((key) => files[key]);

        setProduct((prev) => ({ ...prev, [name]: toArr }));
    };

    return (
        <div className="container-sm">
            <div className="product-form">
                <h2 className="product-form__title">
                    {match.params.id ? 'Редактировать' : 'Добавить'} товар
                </h2>
                <p className="fieldError">{error && '* Заполните все поля'}</p>
                <form onSubmit={submitFormHandler}>
                    {categories.length ? (
                        <div className="product-form__row">
                            <label>* Категория</label>
                            <TreeSelect
                                value={product.category}
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: 'auto',
                                }}
                                treeData={categories || []}
                                placeholder="Выберите категорию"
                                treeDefaultExpandAll={!!match.params.id}
                                className="product-form__select"
                                onChange={onChangeCategory}
                            />
                        </div>
                    ) : <p>* Невозможно добавить товар без категории! Добавьте категории, чтобы привязать товар.</p>}

                    <div className="product-form__row product-form__row--sm">
                        <label>* Артикул</label>
                        <input
                            type="text"
                            name="code"
                            value={product.code}
                            onChange={(e) => handleChange(e)}
                            className="product-form__input-sm"
                            required
                        />
                    </div>
                    <div className="product-form__row product-form__row--sm">
                        <label>* Ед. измерения</label>
                        <select
                            name="unit"
                            value={product.unit}
                            onChange={(e) => handleChange(e)}
                            className="product-form__input-sm"
                        >
                            <option value="шт.">шт.</option>
                            <option value="уп.">уп.</option>
                            <option value="метр">метр</option>
                            <option value="килограмм">килограмм</option>
                        </select>
                    </div>
                    <div className="product-form__row">
                        <label>* Название</label>
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => handleChange(e)}
                            required
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
                    <div className="product-form__row">
                        <label>Фото</label>

                        <label className="custom-file-upload">
                            <input
                                type="file"
                                name="image"
                                className="custom-file-input"
                                onChange={fileChangeHandler}
                                multiple
                            />
                            {product.image?.length
                                ? `Выбрано файлов - ${product.image.length}`
                                : 'Выберите файл'}
                        </label>
                    </div>
                    <div className="product-form__double">
                        <div className="product-form__double-row">
                            <label>* Цена за ед.</label>
                            <input
                                type="number"
                                name="price"
                                min={0}
                                value={product.price}
                                onChange={(e) => handleChange(e)}
                                className="product-form__input-xs"
                                required
                            />
                        </div>
                        <div className="product-form__double-row">
                            <label>* Количество</label>
                            <input
                                type="number"
                                name="amount"
                                min={1}
                                value={product.amount}
                                onChange={(e) => handleChange(e)}
                                className="product-form__input-xs"
                                required
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
                        <label>* Скидка (%)</label>
                        <input
                            type="number"
                            name="discount"
                            value={product.discount}
                            onChange={(e) => handleChange(e)}
                            className="product-form__input-xs"
                            min={0}
                            required
                        />
                    </div>
                    <div className="product-form__row">
                        <label>Кол-во / Скидка</label>
                        <input
                            type="number"
                            name="amountForDiscount"
                            value={product.amountForDiscount}
                            onChange={(e) => handleChange(e)}
                            className="product-form__input-xs"
                            min={1}
                            required
                        />
                    </div>
                    <button className="button">
                        {match.params.id ? 'Сохранить' : 'Добавить товар'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
