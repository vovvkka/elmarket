import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/actions/categoriesActions';
import { useHistory, useLocation } from 'react-router-dom';
import arrowDown from '../../../assets/svg/arrowDown.svg';

const CategoryMenu = ({ setCategory }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const categories = useSelector((state) => state.categories.categories);
    const [expanded, setExpanded] = useState([]);
    const history = useHistory();
    const query = new URLSearchParams(location.search);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const expandHandler = (catId) => {
        if (expanded.includes(catId)) {
            setExpanded((prev) => prev.filter((id) => catId !== id));
        } else {
            setExpanded((prev) => [...prev, catId]);
        }
    };

    const handleChoice = (category) => {
        const { _id, parentCategory, title } = category;
        query.set('category', _id);
        query.set('page', '1');
        parentCategory ? query.set('parent', 'true') : query.delete('parent');
        history.push({
            pathname: location.pathname,
            search: `?${query.toString()}`,
        });
        setCategory(title);
        setSelected(_id);
    };

    return (
        <div className="category-menu">
            <h3 className="category-menu__title">Каталог товаров</h3>
            <ul>
                {categories.map((category) => (
                    <>
                        <li
                            className={`category-menu__category ${
                                category._id === selected
                                    ? 'category-menu__category--active'
                                    : ''
                            }`}
                            onClick={() => handleChoice(category)}
                        >
                            <span>{category.title}</span>
                            {category.subCategories.length ? (
                                <button
                                    onClick={() => expandHandler(category._id)}
                                >
                                    <img src={arrowDown} alt="Раскрыть" />
                                </button>
                            ) : null}
                        </li>
                        {expanded.includes(category._id) ? (
                            <ul>
                                {category.subCategories.map((sub) => (
                                    <li
                                        className={`category-menu__subCategory ${
                                            sub._id === selected
                                                ? 'category-menu__subCategory--active'
                                                : ''
                                        }`}
                                        onClick={() => handleChoice(sub)}
                                    >
                                        {sub.title}
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </>
                ))}
            </ul>
        </div>
    );
};

export default CategoryMenu;
