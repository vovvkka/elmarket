import React from 'react';
import {Link} from 'react-router-dom';
import ProductsTable from '../components/ProductsTable/ProductsTable';
import {useDispatch, useSelector} from 'react-redux';
import Paginate from "../components/UI/Paginate/Paginate";
import {fetchProducts} from "../store/actions/productsActions";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    const onSearch = val => {
        dispatch(fetchProducts("admin?search=" + val));
    };

    return (
        <div className="admin-products">
            <div className="admin-products__upper">
                <h2 className="admin-products__title">Товары</h2>
                <Link className="button" to="/admin/add-product">
                    Добавить товар
                </Link>
            </div>
            <div>
                <input
                    type="search"
                    placeholder="Введите артикул или название"
                    onKeyPress={e => e.key === "Enter" && onSearch(e.target.value)}
                    className="admin-products__search"
                />

                <ProductsTable products={products} />
                <div className="admin-products__paginate">
                    <Paginate isProducts limit={4}/>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
