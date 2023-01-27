import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/actions/ordersActions';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import { Link, useLocation } from 'react-router-dom';
import Paginate from '../components/UI/Paginate/Paginate';

const AdminOrders = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const orders = useSelector((state) => state.orders.orders);

    useEffect(() => {
        if (location.search.includes('archive')) {
            dispatch(fetchOrders('?status=closed&' + location.search));
        } else {
            dispatch(fetchOrders('?status=active&' + location.search));
        }
    }, [dispatch, location.pathname, location.search]);

    return (
        <div className="admin-orders">
            <div className="admin-orders__upper">
                <h2 className="admin-orders__title">Заказы</h2>
                {location.search.includes('archive') ? (
                    <Link className="button" to="/admin/orders">
                        Вернуться к заказам
                    </Link>
                ) : (
                    <Link
                        className="button"
                        to="/admin/orders?archive=true&page=1"
                    >
                        Архив
                    </Link>
                )}
            </div>
            <div>
                <OrdersTable
                    orders={orders}
                    isArchive={location.search.includes('archive')}
                />

                <div className="admin-products__paginate">
                    <Paginate isOrders limit={4} />
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
