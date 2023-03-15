import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/actions/ordersActions';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import { Link, useLocation } from 'react-router-dom';
import Paginate from '../components/UI/Paginate/Paginate';
import noOrders from '../assets/404.png';

const AdminOrders = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const orders = useSelector((state) => state.orders.orders?.orders);
    const urlParams = new URLSearchParams(window.location.search);
    const archive = urlParams.get('archive');

    useEffect(() => {
        if (archive) {
            dispatch(fetchOrders('?status=closed&' + location.search));
        } else {
            dispatch(fetchOrders('?status=active&' + location.search));
        }
    }, [archive, dispatch]);

    return (
        <div className="admin-orders">
            <div className="admin-orders__upper">
                <h2 className="admin-orders__title">Заказы</h2>
                {location.search.includes('archive') ? (
                    <Link className="button" to="/admin/orders?page=1">
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

                {!orders?.length ? (
                    <div className="admin-orders__no-orders">
                        <p>Новых заказов пока нет! Возвращайтесь позже!</p>
                        <img src={noOrders} alt="" width={150} />
                    </div>
                ) : null}

                <div className="admin-products__paginate">
                    <Paginate isOrders limit={4} />
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
