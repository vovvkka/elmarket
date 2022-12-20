import React from 'react';
import ProductCard from "../components/ProductCard/ProductCard";

const Catalog = () => {
    return (
        <div className='container-sm'>
            <div className='catalog'>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>

        </div>
    );
};

export default Catalog;