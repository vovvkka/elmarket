import React from 'react';
import deleteIcon from '../../assets/svg/delete.svg';
import archive from '../../assets/archiveIcon.png';
import {useDispatch} from 'react-redux';
import {
    changeOrderStatus,
    deleteOrder,
} from '../../store/actions/ordersActions';

const OrdersTable = ({orders, isArchive, userTable}) => {
    const dispatch = useDispatch();

    const getTotalPrice = (order) => {
        const quantity = order.quantity;
        const price = order.product.price;
        const discountThreshold = order.product.amountForDiscount;
        const discountRate = order.product.discount / 100;

        let total = quantity * price;

        if (quantity >= discountThreshold) {
            const numDiscountedItems = Math.floor(quantity / discountThreshold);
            const discountedPrice = price - (price * discountRate);
            const discountedTotal = numDiscountedItems * discountThreshold * discountedPrice;
            const remainingItems = quantity % discountThreshold;
            total = discountedTotal + (remainingItems * price);
        }

        return total;
    }

    console.log(orders)

    return (
        <div className="table table__orders">
            <table>
                <thead>
                <tr>
                    <th>ФИО клиента:</th>
                    <th>Телефон:</th>
                    <th>Заказ:</th>
                    <th>Общая сумма:</th>
                    <th>Статус:</th>
                    <th>Дата оформления:</th>
                    {!userTable ? <th>Действие:</th> : null}
                </tr>
                </thead>
                <tbody>
                {!!orders?.length && orders?.map((order) => {
                    const classes = [];

                    order?.status === 'Новый'
                        ? classes.push('table__red')
                        : classes.push('table__green');

                    return (
                        <tr key={order?._id}>
                            <td className="table__sm">{order?.customer}</td>
                            <td className="table__s">{order?.phone}</td>
                            <td>
                                {order.order.map((order) => (
                                    <p
                                        key={order?._id}
                                        className="table__subFields"
                                    >
                                        <span>({order?.product?.code})</span>
                                        <b> {order?.product?.title}</b>
                                        <span> x<b>{order?.quantity}</b></span>
                                        {' '}
                                        <b>({order?.product?.unit ? order?.product?.unit : 'шт.'})</b>
                                    </p>
                                ))}
                            </td>
                            <td className="table__xs">
                                {
                                    order.userId ? getTotalPrice(order.order[0]) : Math.floor(order.order.reduce((num, acc) => num + acc.product.price * acc.quantity, 0))
                                }
                            </td>
                            <td className={classes.join(' ')}>
                                {order?.status}
                            </td>
                            <td className="table__date">
                                <p>{order?.dateTime} </p>
                                <a
                                    href={"https://electromarket.kg/order-checkout/" + order._id}
                                    className="table__link"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Детальная информация...
                                </a>
                            </td>
                            {!userTable ? (
                                <td>
                                    <div className="table__actions">
                                        {!isArchive && (
                                            <img
                                                src={archive}
                                                alt="Архивировать"
                                                width={35}
                                                onClick={() =>
                                                    dispatch(changeOrderStatus(order?._id))
                                                }
                                            />
                                        )}

                                        <img
                                            src={deleteIcon}
                                            alt="Удалить"
                                            width={30}
                                            onClick={() =>
                                                dispatch(
                                                    deleteOrder(order?._id)
                                                )
                                            }
                                        />
                                    </div>
                                </td>
                            ) : null}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default OrdersTable;
