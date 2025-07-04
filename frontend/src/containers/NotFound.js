import React, { useState } from 'react';
import unknown from '../assets/404.png';
import { Link } from 'react-router-dom';
import { historyPush } from '../store/actions/historyActions';
import { useDispatch } from 'react-redux';

const NotFound = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        searchParams.set('search', search);
        searchParams.set('page', '1');
        const newUrl = `/search?${searchParams.toString()}`;
        dispatch(historyPush(newUrl));
    };

    return (
        <form className="not-found" onSubmit={searchHandler}>
            <div className="not-found__info">
                <span className="not-found__404">404</span>
                <p className="not-found__title">
                    Кажется, что-то пошло не так...
                </p>
                <p className="not-found__text">
                    Пожалуйста, воспользуйтесь поиском по сайту или вернитесь на{' '}
                    <Link to="/">ГЛАВНУЮ</Link>
                </p>
                <div className="search">
                    <input
                        className="search__input"
                        type="text"
                        placeholder="поиск по каталогу"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <button className="search__button" type="submit">
                        <svg
                            width="28"
                            height="25"
                            viewBox="0 0 19 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path
                                    d="M6.57132 0C8.45677 0 10.0927 0.713001 11.278 1.8381C12.4633 3.01554 13.2258 4.55928 13.2258 6.2731C13.2258 7.70564 12.7267 8.98119 11.9088 10.0213L18.8683 15.2608C18.9931 15.4374 19.0555 15.686 18.9307 15.8626C18.7366 16.0327 18.487 16.0327 18.2999 15.9215L11.3542 10.6361L11.278 10.7081C10.0927 11.8463 8.45677 12.5462 6.57132 12.5462C4.76906 12.5462 3.12623 11.8463 1.9409 10.7081C0.693178 9.58299 0 8 0 6.2731C0 4.55928 0.693178 3.01554 1.9409 1.8381C3.13316 0.713001 4.76906 0 6.57132 0ZM10.7096 2.43336C9.6421 1.426 8.20722 0.830744 6.57132 0.830744C5.01167 0.830744 3.56293 1.426 2.49544 2.43336C1.43488 3.44072 0.81795 4.79477 0.81795 6.2731C0.81795 7.80376 1.43488 9.17743 2.50237 10.1783C3.56986 11.1267 5.01861 11.7809 6.57826 11.7809C8.21416 11.7809 9.64903 11.1267 10.7165 10.1783C11.7979 9.17089 12.4148 7.80376 12.4148 6.2731C12.4079 4.79477 11.7979 3.44072 10.7096 2.43336Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_6_10">
                                    <rect width="19" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <img src={unknown} alt="404" width={400} />
            </div>
        </form>
    );
};

export default NotFound;
