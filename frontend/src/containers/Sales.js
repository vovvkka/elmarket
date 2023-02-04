import React, {useEffect} from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSales} from '../store/actions/productsActions';
import {useLocation} from 'react-router-dom';
import Paginate from '../components/UI/Paginate/Paginate';
import Spinner from "../components/UI/Spinner/Spinner";

const Sales = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector(state => state.products.loading);
    const params = new URLSearchParams(location.search);
    const search = params.get('search');

    useEffect(() => {
        dispatch(fetchSales());
    }, [location.search, dispatch, search]);

    return (
        <>
            {loading && <Spinner/>}
            <div className="container-sm">
                <div className="catalog">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                    {!products?.length && <p>Продукты не найдены!</p>}
                </div>

                <div className="catalog__paginate">
                    <Paginate sales isProducts limit={10} />
                </div>
            </div>
        </>
    );
};

export default Sales;
