import React from 'react';
import {Link} from 'react-router-dom';
import ProductsTable from '../components/ProductsTable/ProductsTable';
import {useSelector} from 'react-redux';
import Paginate from "../components/UI/Paginate/Paginate";

const AdminProducts = () => {
    const products = useSelector((state) => state.products.products);

    return (
        <div className="admin-products">
            <div className="admin-products__upper">
                <h2 className="admin-products__title">Товары</h2>
                <Link className="button" to="/admin/add-product">
                    Добавить товар
                </Link>
            </div>
            <div>
                <ProductsTable products={products} />
                <div className="admin-products__paginate">
                    <Paginate isProducts limit={4}/>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
