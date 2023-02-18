import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import Paginate from '../components/UI/Paginate/Paginate';
import { fetchProducts } from '../store/actions/productsActions';
import Spinner from '../components/UI/Spinner/Spinner';
import { clearProducts } from '../store/slices/productsSlice';

const SearchPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const totalItems = useSelector((state) => state.products.totalItems);
    const params = new URLSearchParams(location.search);
    const search = params.get('search');

    useEffect(() => {
        dispatch(fetchProducts(location.search));

        return () => {
            dispatch(clearProducts());
        };
    }, [location.search, dispatch, search]);

    return (
        <>
            {loading && <Spinner />}
            <div className="container-sm">
                <div className="search-page">
                    <h2 className="search-page__title">
                        Результатов поиска по запросу "
                        {new URLSearchParams(location.search).get('search')}" -{' '}
                        {totalItems}
                    </h2>
                    <div className="catalog">
                        {products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    {!products?.length && (
                        <div className='search-page__not-found'>
                            <p>
                                Товары по вашему запросу не найдены, возвращайтесь позже или перейдите в каталог товаров!
                            </p>
                            <Link to='/catalog?page=1' className='button'>Перейти в каталог</Link>
                        </div>
                    )}
                    <div className="catalog__paginate">
                        <Paginate isProducts limit={10} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
