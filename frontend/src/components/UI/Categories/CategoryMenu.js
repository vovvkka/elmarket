import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/actions/categoriesActions';
import { useHistory, useLocation } from 'react-router-dom';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import burger from '../../../assets/svg/burger.svg';
import { useMediaQuery } from 'react-responsive';

const CategoryMenu = ({ setCategory }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const categories = useSelector((state) => state.categories.categories);
    const query = new URLSearchParams(location.search);
    const [expanded, setExpanded] = useState([]);
    const [mobileExpanded, setMobileExpanded] = useState(true);
    const [selected, setSelected] = useState('');
    const matches = useMediaQuery({ maxWidth: 800 });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const category = query.get('category');
        if (categories) {
            const obj = categories.find((cat) => cat._id === category);

            if (obj) {
                setCategory(obj.title);
            }
        }
    }, [categories, location.search, setCategory]);

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
        setMobileExpanded(false);
    };

    return (
        <div
            className={`category-menu ${
                matches ? 'category-menu__mobile' : ''
            }`}
        >
            <h3 className="category-menu__title">
                Каталог товаров
                {matches ? (
                    <img
                        src={burger}
                        alt="Раскрыть"
                        width={25}
                        onClick={() => setMobileExpanded(!mobileExpanded)}
                    />
                ) : null}
            </h3>
            {matches && mobileExpanded ? (
                <ul>
                    {!!categories.length && categories?.map((category) => (
                        <div key={category._id}>
                            <li
                                className={`category-menu__category ${
                                    category._id === selected
                                        ? 'category-menu__category--active'
                                        : ''
                                }`}
                                key={category._id}
                            >
                                <span onClick={() => handleChoice(category)}>
                                    {category.title}
                                </span>
                                {category.subCategories.length ? (
                                    <button
                                        className='category-menu__button-expand'
                                        onClick={() =>
                                            expandHandler(category._id)
                                        }
                                    >
                                        <img src={arrowDown} alt="Раскрыть" />
                                    </button>
                                ) : null}
                            </li>
                            {expanded.includes(category._id) ? (
                                <ul>
                                    {category?.subCategories?.map((sub) => (
                                        <li
                                            className={`category-menu__subCategory ${
                                                sub._id === selected
                                                    ? 'category-menu__subCategory--active'
                                                    : ''
                                            }`}
                                            key={sub._id}
                                            onClick={() => handleChoice(sub)}
                                        >
                                            {sub.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ))}
                </ul>
            ) : !matches ? (
                <ul>
                    {categories.map((category) => (
                        <div key={category._id}>
                            <li
                                className={`category-menu__category ${
                                    category._id === selected
                                        ? 'category-menu__category--active'
                                        : ''
                                }`}
                                key={category._id}
                                onClick={() => handleChoice(category)}
                            >
                                <span>{category.title}</span>
                                {category?.subCategories?.length ? (
                                    <button
                                        onClick={() =>
                                            expandHandler(category._id)
                                        }
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
                                            key={sub._id}
                                            onClick={() => handleChoice(sub)}
                                        >
                                            {sub.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default CategoryMenu;
