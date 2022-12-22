import React, {useEffect} from 'react';
import ProductCard from "../components/ProductCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../store/actions/productsActions";

const Catalog = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <div className='container-sm'>
            <div className='catalog'>
                {products.map(product => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
    );
};

export default Catalog;