import React, { useEffect, useState } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/actions/categoriesActions';
import {fetchProducts} from "../../../store/actions/productsActions";

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [catalogActive, setCatalogActive] = useState(false);
    const [subActive, setSubActive] = useState([]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChoice = (id, parent) => {
        if (!parent) {
            setCatalogActive(false);
            dispatch(fetchProducts('?category=' + id));
        } else {
            setCatalogActive(false);
            dispatch(fetchProducts('?category=' + id + '&parent=true'));
        }
    };

    return (
        <>
            <Backdrop
                show={catalogActive}
                clicked={() => setCatalogActive(false)}
            />
            <button
                className="button categories__button"
                onClick={() => setCatalogActive(!catalogActive)}
            >
                Категории
            </button>
            <div
                className="categories__modal"
                style={{
                    opacity: catalogActive ? '1' : '0',
                }}
            >
                <div className="categories__list">
                    <div className="categories__triangle">
                    </div>
                    <h2 className="categories__title">Категории</h2>
                    <div className='categories__catalog'>
                        <ul className='categories__main'>
                            {categories.map((category) => (
                                <li
                                    key={category._id}
                                    onMouseOver={() => setSubActive(category.subCategories)}
                                    onClick={() => handleChoice(category._id, category.parentCategory)}
                                >
                                    <span>{category.title}</span>
                                    {category.subCategories.length ? (
                                        <span>></span>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                        <ul className='categories__sub'>
                            {subActive.length ? subActive.map(sub => (
                                <li    onClick={() => handleChoice(sub._id, sub.parentCategory)}>{sub.title}</li>
                            )) : null}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
