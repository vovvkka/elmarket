import React from 'react';
import deleteIcon from '../../assets/svg/delete.svg';
import edit from '../../assets/svg/edit.svg';

const ProductsTable = ({ products }) => {
    return (
        <div className='table'>
            <table>
                <thead>
                    <tr>
                        <th>Артикул</th>
                        <th>Название</th>
                        <th>Категория</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.code}</td>
                            <td>{product.title}</td>
                            <td>
                                {product.category.title}{' '}
                                {product.subCategory &&
                                    ` > ${product.subCategory.title}`}
                            </td>
                            <td>{product.amount}</td>
                            <td>{product.price}</td>
                            <td>
                                <div className="table__actions">
                                    <img
                                        src={edit}
                                        alt="Редактировать"
                                        width={35}
                                    />
                                    <img
                                        src={deleteIcon}
                                        alt="Удалить"
                                        width={30}
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

export default ProductsTable;
