import React, {useEffect} from 'react';
import {fetchOne} from '../store/actions/productsActions';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFeedbacks} from '../store/actions/feedbackActions';
import Rating from 'react-rating';
import star from '../assets/svg/star.svg';
import fullStar from '../assets/svg/fullStar.svg';
import {Link} from "react-router-dom";

const Reviews = ({ match }) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.product);
    const feedbacks = useSelector((state) => state.feedback.feedbacks.rating);
    const user = useSelector((state) => state.users.user);

    useEffect(() => {
        if (match.params.id) {
            dispatch(fetchOne(match.params.id));
            dispatch(fetchFeedbacks(match.params.id));
        }
    }, [dispatch, match.params.id]);

    return (
        <div className="container-sm">
            <div className="reviews">
                <div className="reviews__upper">
                    <div className="reviews__empty" />
                    <h2 className="reviews__title">Отзывы</h2>
                    {user ? (
                        <div className="reviews__button">
                            <Link
                                to={`/feedback/${match.params.id}`}
                                className="button"
                            >
                                Добавить отзыв
                            </Link>
                        </div>
                    ) : (
                        <div className="reviews__empty" />
                    )}
                </div>

                {product && <p className="feedback__title">{product.title}</p>}
                {feedbacks?.map((f) => (
                    <div className="reviews__card" key={f._id}>
                        <p>{f.user.email}</p>
                        <span className='reviews__date'>{new Date(f.createdAt).toLocaleString()}</span>
                        <Rating
                            className="rating reviews__rating"
                            initialRating={f.rating}
                            emptySymbol={
                                <img
                                    src={star}
                                    className="product-card__star"
                                    alt="empty-star"
                                />
                            }
                            fullSymbol={
                                <img
                                    src={fullStar}
                                    className="product-card__star"
                                    alt="full-star"
                                />
                            }
                            readonly
                        />
                        <p>{f.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
