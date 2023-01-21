import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders} from "../store/actions/ordersActions";
import OrdersTable from "../components/OrdersTable/OrdersTable";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    return (
        <div className="admin-orders">
            <div className="admin-orders__upper">
                <h2 className="admin-orders__title">Заказы</h2>
            </div>
            <div>
                <OrdersTable orders={orders} />
                {/*<div className="admin-products__paginate">*/}
                {/*    <Paginate isProducts limit={4}/>*/}
                {/*/!*</div>*!/*/}
            </div>
        </div>
    );
};

export default AdminOrders;
