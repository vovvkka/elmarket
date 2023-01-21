import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders} from "../store/actions/ordersActions";
import OrdersTable from "../components/OrdersTable/OrdersTable";
import {Link} from "react-router-dom";

const AdminOrders = ({location}) => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);

    useEffect(() => {
        if (location.search.includes('archive')) {
            dispatch(fetchOrders('?status=closed'));
        } else {
            dispatch(fetchOrders('?status=active'));
        }
    }, [dispatch, location]);

    return (
        <div className="admin-orders">
            <div className="admin-orders__upper">
                <h2 className="admin-orders__title">Заказы</h2>
                {
                    location.search.includes('archive') ?
                        <Link className="button" to="/admin/orders">Вернуться к заказам</Link>
                        :
                        <Link className="button" to="/admin/orders?archive=true">Архив</Link>
                }
            </div>
            <div>
                <OrdersTable orders={orders} isArchive={location.search.includes('archive')}/>
                {/*<div className="admin-products__paginate">*/}
                {/*    <Paginate isProducts limit={4}/>*/}
                {/*/!*</div>*!/*/}
            </div>
        </div>
    );
};

export default AdminOrders;
