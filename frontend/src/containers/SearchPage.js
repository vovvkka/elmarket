import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import Paginate from '../components/UI/Paginate/Paginate';
import { fetchProducts } from '../store/actions/productsActions';

const SearchPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const products = useSelector((state) => state.products.products);
    const totalItems = useSelector((state) => state.products.totalItems);
    const params = new URLSearchParams(location.search);
    const search = params.get("search");

    useEffect(() => {
        dispatch(fetchProducts(location.search));
    }, [location.search, dispatch, search]);

    return (
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
                    {!products?.length && <p>Продукты не найдены!</p>}
                </div>

                <div className="catalog__paginate">
                    <Paginate isProducts limit={10} />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
