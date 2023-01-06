import React, {useEffect} from 'react';
import ProductCard from "../components/ProductCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../store/actions/productsActions";
import {useLocation} from "react-router-dom";

const Catalog = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const location = useLocation();

    useEffect(() => {
        if (location.search) {
            dispatch(fetchProducts(location.search));
        } else {
            dispatch(fetchProducts());
        }

    }, [dispatch, location]);

    return (
        <div className='container-sm'>
            <div className='catalog'>
                {products.map(product => (
                    <ProductCard key={product._id} product={product}/>
                ))}
                {!products.length && <p>Продукты не найдены!</p>}
            </div>
        </div>
    );
};

export default Catalog;