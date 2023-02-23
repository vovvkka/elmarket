import React from 'react';
import edit from "../../assets/svg/edit.svg";
import deleteIcon from "../../assets/svg/delete.svg";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteCategory} from "../../store/actions/categoriesActions";

const CategoriesTable = ({ categories }) => {
    const dispatch = useDispatch();

    return (
        <div className='table'>
            <table>
                <thead>
                <tr>
                    <th>Внешняя категория</th>
                    <th>Название</th>
                    <th style={{width: '10%'}}>Популярный раздел</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                {categories?.map((category) => (
                    <tr key={category._id}>
                        <td>{category.parentCategory ? category.parentCategory.title : "Нет"}</td>
                        <td>{category.title}</td>
                        <td>{category.isPopular ? "Да" : "Нет"}</td>
                        <td>
                            <div className="table__actions">
                                <Link to={"/admin/edit-category/" + category._id}>
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
                                    onClick={() => dispatch(deleteCategory(category._id))}
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

export default CategoriesTable;