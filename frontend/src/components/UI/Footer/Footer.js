import React, {useEffect} from 'react';
import logo from '../../../assets/logo.png';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getPopularCategories} from '../../../store/actions/categoriesActions';
import instagram from '../../../assets/svg/instagram.svg';

const Footer = () => {
    const dispatch = useDispatch();
    const popularCategories = useSelector(
        (state) => state.categories.popularCategories
    );
    const contacts = useSelector((state) => state.contacts.contacts);

    useEffect(() => {
        dispatch(getPopularCategories());
    }, [dispatch]);

    const categoriesList = popularCategories.map((c) => (
        <li key={c._id}>
            <Link to={`/catalog?category=${c._id}&page=1`}>{c.title}</Link>
        </li>
    ));

    return (
        <div className="footer">
            <div className="footer__container">
                <div className="footer__top">
                    <img
                        src={logo}
                        alt="Electromarket.kg"
                        className="logo"
                        draggable={false}
                    />
                    <div className="footer__contacts">
                        <h2 className="footer__contacts-title">
                            Мы в соц сетях
                        </h2>
                        <div className="footer__icons">
                            <a href={contacts.instagramLink} target="_blank">
                                <img
                                    src={instagram}
                                    alt="Instagram"
                                    className="footer__social"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <ul className="footer__nav">
                        <li className="footer__nav-first">
                            Популярные разделы
                        </li>
                        {categoriesList}
                    </ul>
                    <ul className="footer__nav">
                        <li className="footer__nav-first">Покупателям</li>

                        <Link to="/payment">
                            <li>Оплата</li>
                        </Link>
                        <Link to="/delivery">
                            <li>Условия доставки</li>
                        </Link>
                        <Link to="/warranty">
                            <li>Гарантия и возврат</li>
                        </Link>
                        <Link to="/payment">
                            <li>Акции</li>
                        </Link>
                        <Link to="/payment">
                            <li>Контакты</li>
                        </Link>

                        <li className="footer__contacts-mobile">
                            <h2 className="footer__contacts-title">
                                Мы в соц сетях
                            </h2>
                            <div className="footer__icons">
                                <a href={contacts.instagramLink}>
                                    <img
                                        src={instagram}
                                        alt="Instagram"
                                        className="footer__social"
                                    />
                                </a>
                            </div>
                        </li>
                    </ul>
                    <ul className="footer__nav">
                        <li className="footer__nav-first">
                            Контакты и реквизиты
                        </li>
                        {contacts?.phone?.map((ph) => (
                            <li key={ph}>{ph}</li>
                        ))}
                        {contacts?.email?.map((em) => (
                            <li key={em}>{em}</li>
                        ))}
                        <li>
                            Понедельник-пятница: <br/>
                            с 9:30 до 18:30 <br/>
                            Суббота:с 10:00 до 18:00 <br/>
                            Воскресенье: ВЫХОДНОЙ <br/>
                        </li>
                        <li>
                            ОсОО “Има Электро” <br/>
                            ИНН01603201810293
                        </li>
                        <li>
                            Юр.адрес: УГНС Ленинского <br/>
                            района, код 002 Код ОКПО <br/>
                            30023004
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
