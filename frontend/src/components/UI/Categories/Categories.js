import React, {useEffect, useState} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../../../store/actions/categoriesActions';
import {useHistory, useLocation} from "react-router-dom";

const Categories = ({setCategory}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const categories = useSelector((state) => state.categories.categories);
    const [catalogActive, setCatalogActive] = useState(false);
    const [subActive, setSubActive] = useState([]);
    const query = new URLSearchParams(location.search);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChoice = (id, parent, title) => {
        query.set("category", id);
        parent ? query.set("parent", 'true') : query.delete("parent");
        history.push({
            pathname: location.pathname,
            search: `?${query.toString()}`
        });
        setCatalogActive(false);
        setCategory(title);
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
                style={{
                    zIndex: catalogActive ? '500' : '1',
                }}
            >
                Категории
            </button>
            <div
                className="categories__modal"
                style={{
                    opacity: catalogActive ? '1' : '0',
                    transform: catalogActive ? 'translateX(0)' : 'translateX(-100vw)',
                }}
            >
                <div className="categories__list">
                    <div className="categories__triangle">
                    </div>
                    <h2 className="categories__title">Категории</h2>
                    <div className='categories__catalog'>
                        <ul className='categories__main'>
                            {categories?.map((category) => (
                                <li
                                    key={category._id}
                                    onMouseOver={() => setSubActive(category.subCategories)}
                                    onClick={() => handleChoice(category._id, category.parentCategory, category.title)}
                                >
                                    <span>{category.title}</span>
                                    {category.subCategories?.length ? (
                                        <span>></span>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                        <ul className='categories__sub'>
                            {subActive?.length ? subActive.map(sub => (
                                <li key={sub._id} onClick={() => handleChoice(sub._id, sub.parentCategory, sub.title)}>{sub.title}</li>
                            )) : null}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
