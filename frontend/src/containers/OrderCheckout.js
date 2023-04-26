import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDisplayOrder } from '../store/actions/ordersActions';
import * as XLSX from 'xlsx';

const exportToXLSX = () => {
    const infoTable = document.querySelector('.order-display__info-table');
    const productsTable = document.querySelector('.order-display__products-table');
    const combinedTable = document.createElement('table');
    infoTable.querySelectorAll('tr').forEach(row => {
        combinedTable.appendChild(row.cloneNode(true));
    });

    productsTable.querySelectorAll('tr').forEach(row => {
        combinedTable.appendChild(row.cloneNode(true));
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(combinedTable);

    for (let i = infoTable.rows.length; i < combinedTable.rows.length; i++) {
        ws['!rows'][i] = { hpx: 30 };
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'order.xlsx');
}

const OrderCheckout = () => {
    const order = useSelector((state) => state.orders.displayOrder);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!order) {
            dispatch(fetchDisplayOrder(id));
        }
    }, [id]);

    return (
        <div className="container-xs">
            <div className='order-display'>
                <h2>Заказ был принят</h2>
                <p>Спасибо. Ваш заказ был принят.</p>
                <table className='order-display__info-table'>
                    <tr style={{textAlign: 'center'}}>
                        <td>Счет на оплату</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Наименование организации и адрес:</b> ЧП Авазбеков Алманбет
                            Авазбекович г.Бишкек
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Получатель: ЗАО "Кыргызcкий Инвестиционно-Кредитный Банк"
                            р/с 1280166055179021
                        </td>
                    </tr>
                    <tr>
                        <td>БИК 128016 ИНН № 22704198201352</td>
                    </tr>
                    <tr>
                        <td><b>Реквизиты:</b> {order?.payment === "Optima" ? "Optima Bank 4169585340501575" : "МБанк | Элсом | О!Деньги +996(709)403-955"}</td>
                    </tr>
                    <tr>
                        <td><b>Кому:</b> {order?.customer}</td>
                    </tr>
                    <tr>
                        <td><b>Телефон:</b> {order?.phone}</td>
                    </tr>
                    <tr>
                        <td><b>Адрес доставки:</b> {order?.address}</td>
                    </tr>
                </table>
                <div className='order-display__wrapper'>
                    <table className='order-display__products-table'>
                        <tr>
                        <td>№</td>
                        <td>Наименование товара</td>
                        <td>Ед. изм.</td>
                        <td>Количество</td>
                        <td>Цена</td>
                        </tr>
                        {order?.order.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.product.title}</td>
                                <td>{item.product.unit ? item.product.unit : 'шт.'}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={5} style={{textAlign: 'right'}}>
                                Итоговая цена: {order?.order.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) } сом
                            </td>
                        </tr>
                    </table>
                </div>
                <button className='button' onClick={exportToXLSX} style={{margin: '10px 0'}}>Сохранить счет на оплату</button>
            </div>

        </div>
    );
};

export default OrderCheckout;
