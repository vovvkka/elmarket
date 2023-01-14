import React from 'react';
import deleteIcon from '../../assets/svg/delete.svg';
import edit from '../../assets/svg/edit.svg';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteProduct} from "../../store/actions/productsActions";

const ProductsTable = ({ products }) => {
    const dispatch = useDispatch();

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
                                    <Link to={"/admin/edit-product/" + product._id}>
                                        <img
                                            src={edit}
                                            alt="Редактировать"
                                            width={35}
                                        />
                                    </Link>

                                    <img
                                        src={deleteIcon}
                                        alt="Удалить"
                                        width={30}
                                        onClick={() => dispatch(deleteProduct(product._id))}
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
