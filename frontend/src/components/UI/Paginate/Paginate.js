import React from 'react';
import {fetchProducts} from '../../../store/actions/productsActions';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Pagination from 'react-paginate';
import {historyPush} from '../../../store/actions/historyActions';
import {fetchCategories} from '../../../store/actions/categoriesActions';

const Paginate = ({ isProducts, limit }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = Number(searchParams.get('page')) || 1;
    const totalProducts = useSelector((state) => state.products.pages);
    const totalCategories = useSelector((state) => state.categories.pages);

    const handlePageChange = (data) => {
        searchParams.set('page', data.selected + 1);
        dispatch(
            historyPush(`${location.pathname}?${searchParams.toString()}`)
        );
        fetchData(data.selected + 1);
    };

    const fetchData = (page) => {
        isProducts
            ? dispatch(fetchProducts('?page=' + page + '&limit=' + limit))
            : dispatch(
                  fetchCategories(
                      '?toTable=true&page=' + page + '&limit=' + limit
                  )
              );
    };

    return (
        <div className="paginate">
            <Pagination
                pageCount={isProducts ? totalProducts : totalCategories}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                initialPage={page - 1}
                previousLabel="< Предудыщая"
                nextLabel="Следующая >"
                containerClassName="paginate__container"
                pageLinkClassName="paginate__page"
                activeLinkClassName="paginate__page--active"
                previousLinkClassName="paginate__button"
                nextLinkClassName="paginate__button"
            />
        </div>
    );
};

export default Paginate;
