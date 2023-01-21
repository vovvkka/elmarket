import React from 'react';
import deleteIcon from '../../assets/svg/delete.svg';
import edit from '../../assets/svg/edit.svg';

const OrdersTable = ({orders}) => {

    const total = orders?.reduce((acc, rec) => {
        rec?.order.forEach(o => {
            acc += o.amount * o.price;
        });

        return acc;
    }, 0)

    return (
        <div className='table'>
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
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order.customer}</td>
                        <td>{order.phone}</td>
                        <td>
                            {order.order.map(order => (
                                <p key={order._id} className="table__subFields">
                                   <b>{order.product.title}</b>  <span>x{order.amount}</span>
                                </p>
                            ))}
                        </td>
                        <td>{total}</td>
                        <td>{order.status}</td>
                        <td>{new Date(order.dateTime).toLocaleString()}</td>
                        <td>
                            <div className="table__actions">
                                {/*<Link to={"/admin/edit-product/" + product._id}>*/}
                                <img
                                    src={edit}
                                    alt="Редактировать"
                                    width={35}
                                />
                                {/*</Link>*/}

                                <img
                                    src={deleteIcon}
                                    alt="Удалить"
                                    width={30}
                                    // onClick={() => dispatch(deleteProduct(product._id))}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
