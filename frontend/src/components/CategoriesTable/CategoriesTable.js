import React from 'react';
import edit from "../../assets/svg/edit.svg";
import deleteIcon from "../../assets/svg/delete.svg";

const CategoriesTable = ({categories}) => {
    return (
        <div className='table'>
            <table>
                <thead>
                <tr>
                    <th>Категория</th>
                    <th>Название</th>
                    <th>Популярный раздел</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(c => (
                    <tr key={c._id}>
                        <td>{c.parentCategory? c.parentCategory.title : "Нет"}</td>
                        <td>{c.title}</td>
                        <td>{c.isPopular? "Да" : "Нет"}</td>
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

export default CategoriesTable;