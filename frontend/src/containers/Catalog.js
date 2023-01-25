import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productsActions';
import { useLocation } from 'react-router-dom';
import Categories from '../components/UI/Categories/Categories';
import Paginate from '../components/UI/Paginate/Paginate';

const Catalog = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const location = useLocation();
    const [title, setTitle] = useState('');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (!query.get('category')) setTitle('');
    }, [location]);

    useEffect(() => {
        dispatch(fetchProducts(location.search + '&limit=20'));
    }, [dispatch, location]);

    return (
        <div className="container-sm">
            <div className="categories">
                <Categories setCategory={(category) => setTitle(category)} />
                {title ? (
                    <span className="categories__selected">{title}</span>
                ) : null}
            </div>
            <div className="catalog">
                {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
                {!products?.length && <p>Продукты не найдены!</p>}
            </div>
            {products?.length ? (
                <div className="catalog__paginate">
                    <Paginate isProducts limit={10} />
                </div>
            ) : null}
        </div>
    );
};

export default Catalog;
