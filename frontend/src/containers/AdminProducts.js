import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductsTable from '../components/ProductsTable/ProductsTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productsActions';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="admin-products">
            <div className="admin-products__upper">
                <h2 className="admin-products__title">Товары</h2>
                <Link className="button" to="/admin/add-product">
                    Добавить товар
                </Link>
            </div>
            <ProductsTable products={products} />
        </div>
    );
};

export default AdminProducts;
