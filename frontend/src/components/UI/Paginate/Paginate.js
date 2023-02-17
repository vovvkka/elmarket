import React from 'react';
import {
    fetchProducts,
    fetchSales,
} from '../../../store/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import { historyPush } from '../../../store/actions/historyActions';
import { fetchCategories } from '../../../store/actions/categoriesActions';
import { fetchOrders } from '../../../store/actions/ordersActions';
import {useMediaQuery} from "react-responsive";

const Paginate = ({ isProducts, limit, sales, isOrders }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = Number(searchParams.get('page')) || 1;
    const totalProducts = useSelector((state) => state.products.totalPages);
    const totalCategories = useSelector((state) => state.categories.pages);
    const totalOrders = useSelector((state) => state.orders.totalPages);
    const matches = useMediaQuery({maxWidth: 768});

    let totalPages;

    if (isProducts) {
        totalPages = totalProducts;
    } else if (isOrders) {
        totalPages = totalOrders;
    } else {
        totalPages = totalCategories;
    }

    const handlePageChange = (data) => {
        searchParams.set('page', data.selected + 1);
        dispatch(
            historyPush(`${location.pathname}?${searchParams.toString()}`)
        );
        fetchData(data.selected + 1);
    };

    const fetchData = (page) => {
        const query = new URLSearchParams(location.search);
        query.set('page', page);
        query.set('limit', limit);
        if (sales) {
            dispatch(fetchSales(`?${query.toString()}`));
        } else if (isProducts) {
            dispatch(fetchProducts(`?${query.toString()}`));
        } else if (isOrders) {
            if (location.search.includes('archive')) {
                dispatch(fetchOrders('?status=closed&' + query.toString()));
            } else {
                dispatch(fetchOrders('?status=active&' + query.toString()));
            }
        } else {
            dispatch(fetchCategories('?toTable=true&' + query.toString()));
        }
    };

    return (
        <div className="paginate">
            <Pagination
                pageCount={totalPages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                initialPage={page - 1}
                previousLabel={matches ? "<" : "<  Предудыщая"}
                nextLabel={matches ? ">" : "Следующая >"}
                containerClassName="paginate__container"
                pageLinkClassName={`paginate__page`}
                activeLinkClassName="paginate__page--active"
                previousLinkClassName="paginate__button"
                nextLinkClassName="paginate__button"
                disabledLinkClassName="paginate__disabled"
                renderOnZeroPageCount={null}

            />
        </div>
    );
};

export default Paginate;
