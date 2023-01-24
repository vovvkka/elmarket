import React, {useEffect} from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSales} from '../store/actions/productsActions';

const Sales = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(fetchSales());
    }, [dispatch]);

    return (
        <div className="container-sm">
            <div className="catalog">
                {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
                {!products.length && <p>Продукты не найдены!</p>}
            </div>
        </div>
    );
};

export default Sales;
