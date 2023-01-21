import React from 'react';
import deleteIcon from '../../assets/svg/delete.svg';
import archive from '../../assets/archiveIcon.png';
import {useDispatch} from "react-redux";
import {changeOrderStatus, deleteOrder} from "../../store/actions/ordersActions";

const OrdersTable = ({orders, isArchive}) => {
    const dispatch = useDispatch();

    const total = orders?.reduce((acc, rec) => {
        rec?.order.forEach(o => {
            acc += o.amount * o.price;
        });

        return acc;
    }, 0);


    return (
        <div className='table table__orders'>
            <table>
                <thead>
                <tr>
                    <th>ФИО клиента</th>
                    <th>Телефон</th>
                    <th>Заказ</th>
                    <th>Общая сумма</th>
                    <th>Статус</th>
                    <th>Дата оформления</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => {
                    const classes = [];

                    order.status === 'Новый' ? classes.push('table__red') : classes.push('table__green');

                    return (
                        <tr key={order._id}>
                            <td className="table__sm">{order.customer}</td>
                            <td className="table__s">{order.phone}</td>
                            <td>
                                {order.order.map(order => (
                                    <p key={order._id} className="table__subFields">
                                        <b>{order.product.title}</b> <span>x{order.amount}</span>
                                    </p>
                                ))}
                            </td>
                            <td className="table__xs">{total}</td>
                            <td className={classes.join(' ')}>{order.status}</td>
                            <td className="table__date">{new Date(order.dateTime).toLocaleString()}</td>
                            <td>
                                <div className="table__actions">
                                    {!isArchive &&
                                        <img
                                            src={archive}
                                            alt="Архивировать"
                                            width={35}
                                            onClick={() => dispatch(changeOrderStatus(order._id))}
                                        />
                                    }

                                    <img
                                        src={deleteIcon}
                                        alt="Удалить"
                                        width={30}
                                        onClick={() => dispatch(deleteOrder(order._id))}
                                    />
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
