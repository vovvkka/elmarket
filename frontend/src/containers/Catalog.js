import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productsActions';
import { useLocation } from 'react-router-dom';
import CategoryMenu from '../components/UI/Categories/CategoryMenu';
import Paginate from '../components/UI/Paginate/Paginate';
import { fetchCategories } from '../store/actions/categoriesActions';
import Spinner from '../components/UI/Spinner/Spinner';
import { clearProducts } from '../store/slices/productsSlice';

const Catalog = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const PLoading = useSelector((state) => state.products.loading);
    const CLoading = useSelector((state) => state.categories.loading);
    const location = useLocation();
    const [title, setTitle] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());

        return () => {
            dispatch(clearProducts());
        };
    }, [dispatch]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (!query.get('category')) setTitle('');
    }, [location]);

    useEffect(() => {
        dispatch(fetchProducts(location.search + '&limit=20'));
    }, [dispatch, location]);

    return (
        <>
            {PLoading || CLoading ? <Spinner /> : null}
            <div className="container-sm">
                <div className="catalog-flex">
                    <CategoryMenu setCategory={(title) => setTitle(title)} />
                    <div>
                        <h2 className="catalog__title">
                            {title ? title : 'Все товары'}
                        </h2>
                        <div className="catalog">
                            {PLoading || CLoading ? (
                                <Spinner />
                            ) : (
                                <>
                                    {products?.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))}
                                    {!products?.length && !PLoading && (
                                        <p>Товары не найдены!</p>
                                    )}
                                </>
                            )}
                        </div>
                        {products?.length ? (
                            <div className={`catalog__paginate ${PLoading ? 'catalog__paginate--loading' : ''}`}>
                                <Paginate isProducts limit={10} />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalog;
