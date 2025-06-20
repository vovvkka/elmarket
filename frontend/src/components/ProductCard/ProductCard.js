import React, { useState } from 'react';
import Rating from 'react-rating';
import star from '../../assets/svg/star.svg';
import fullStar from '../../assets/svg/fullStar.svg';
import productCard from '../../assets/svg/product-cart.svg';
import noPhoto from '../../assets/no-photo.png';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/slices/cartSlice';
import { addNotification } from '../../store/actions/notifierActions';
import { decreaseAmount } from '../../store/slices/productsSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [quantity, setQuantity] = useState(1);
  const { products } = useSelector((state) => state.cart);
  const productInCart = products.find((p) => p._id === product._id);

  const addQuantity = () => {
    if (!user || user.role !== 'admin') {
      if (quantity < product.amount) {
        setQuantity((prev) => prev + 1);
      }
    }
  };

  const handleAdd = () => {
    if (!user || user.role !== 'admin') {
      dispatch(decreaseAmount({ id: product._id, quantity }));

      dispatch(addProduct({ ...product, quantity }));

      dispatch(addNotification('Товар успешно добавлен в корзину!', 'success'));
    }
  };

  const handleInsert = (e) => {
    const { value } = e.target;
    const number = Number(value);
    if (number || number === 0) {
      // if (productInCart?.quantity) {
        if (e.target.value > (product.amount - productInCart?.quantity)) {
          dispatch(
              addNotification(
                  `Вы можете добавить не более ${
                      product.amount - productInCart?.quantity
                  } единиц товара`,
                  'warn'
              )
          );
          setQuantity(product.amount - productInCart?.quantity);
        } else {
          if (number === 0) {
            setQuantity('');
          } else {
            setQuantity(number);
          }
        }
      // } else {
      //   dispatch(
      //       addNotification(
      //           `Вы можете добавить не более ${product.amount} единиц товара`,
      //           'warn'
      //       )
      //   );
      //   setQuantity(product.amount);
      // }
    }
  };

  return (
    product && (
      <div className="product-card">
        <div className="product-card__column">
          <Link to={`/catalog/${product._id}`} className="clickable">
            <div className="product-card__top">
              <div className="product-card__hits">
                {product.isNovelty ? (
                  <p className="product-card__novelty">Новинка</p>
                ) : null}
                {product.isHit ? (
                  <p className="product-card__hit">Хит</p>
                ) : null}
                {product.discount && user ? (
                  <p className="product-card__discount">-{product.discount}%</p>
                ) : null}
              </div>
              {product.rating && (
                <Rating
                  initialRating={product.rating}
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
              )}

              <div className="product-card__image">
                {product.image.length ? (
                  <img
                    src={apiUrl + '/' + product.image[0]}
                    width="90%"
                    alt={product.title}
                  />
                ) : (
                  <img src={noPhoto} width="90%" alt="product-img" />
                )}
              </div>
            </div>
          </Link>
          <div className="product-card__bottom">
            <Link to={`catalog/${product._id}`} className="clickable">
              <h5 className="product-card__title">{product.title}</h5>
              {product.discount ? (
                <div className="product-card__price-discount">
                  {user ? (
                    <>
                      <p className="product-card__old-price">
                        {product.price} сом{' '}
                      </p>
                      <p className="product-card__price">
                        {Math.floor(
                          product.price -
                            (product.price / 100) * product.discount
                        )}{' '}
                        сом
                        <span className="product-card__discountForAmount">
                          {product.amountForDiscount > 1
                            ? ` / ${product.amountForDiscount} ${product.unit}.`
                            : null}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="product-card__price">{product.price} сом</p>
                  )}
                </div>
              ) : (
                <p className="product-card__price">{product.price} сом</p>
              )}
              <span
                className={`product-card__in-stock ${
                  product.amount === 0 ? 'product-card__in-stock--not' : ''
                }`}
              >
                {product.amount > 0 ? 'в наличии' : 'нет в наличии'}
              </span>
              <div className="product-card__cart-block"></div>
            </Link>
            <div className="product-card__cart">
              <div
                className={`product-card__buttons ${
                  product.amount <= 0 ||
                  productInCart?.quantity >= productInCart?.amount
                    ? 'product-card__buttons--disabled'
                    : ''
                }`}
              >
                <button className="product-card__button" onClick={addQuantity}>
                  +
                </button>
                <input
                  size=""
                  className="product-card__insert"
                  type="text"
                  value={quantity}
                  onChange={(e) => handleInsert(e)}
                />
                {/*<span>{quantity}</span>*/}
                <button
                  className="product-card__button"
                  onClick={() => {
                    if (quantity > 1) setQuantity((prev) => prev - 1);
                  }}
                >
                  -
                </button>
              </div>
              <div>
                <button
                  className="product-card__add"
                  onClick={handleAdd}
                  disabled={
                    product.amount <= 0 ||
                    productInCart?.quantity >= productInCart?.amount
                  }
                >
                  В корзину <img src={productCard} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
