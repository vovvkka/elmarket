import React, { useState } from 'react';

const AddProduct = () => {
    const [product, setProduct] = useState({
        title: '',
        code: '',
        description: '',
        price: '',
        amount: '',
        isHit: false,
        isNovelty: false,
        discount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container-sm">
            <div className="product-form">
                <h2 className="product-form__title">Добавить товар</h2>
                <form>
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
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="product-form__check">
                        <label>Новинка</label>
                        <input
                            type="checkbox"
                            name="isNovelty"
                            checked={product.isNovelty}
                            onChange={(e) => handleChange(e)}
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
