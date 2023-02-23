import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchContacts} from "../store/actions/contactsActions";

const Delivery = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.contacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className='delivery'>
            <div className='container-sm'>
                <h3 className='delivery__title'>Доставка</h3>
                <p className='delivery__text'>Привезем в удобное время и место с понедельника по пятницу. <br/> Стоимость доставки <span className='delivery__orange'>БЕСПЛАТНАЯ</span> при сумме покупки от 10000 сом в пределах города Бишкек, при сумме меньше 10000 сом доставка от 200 сом.</p>
                <h3 className='delivery__title'>Доставка до 2-х дней</h3>
                <p className='delivery__text'>Заказ считается принятым и оформленным только после подтверждения заказа менеджером по телефону.</p>
                <h3 className='delivery__title'>Как оформить заказ?</h3>
                <p className='delivery__text'>Сформируйте заказ, который Вы хотите приобрести в нашем интернет-магазине, затем положите выбранный товар в корзину и подтвердите заказ через корзину. После оформления заказа с вами свяжется менеджер для подтверждения заказа и расскажет про время доставки.</p>
                <p className='delivery__text'>Проконсультироваться по вопросам доставки в регионы можно по телефону  с 9:00 до 18:00 или по e-mail {contacts?.email[0]}. Услуги транспортной компании в пределах города при покупке более 10000 сом в Бишкеке <span className='delivery__orange'>БЕСПЛАТНЫЕ</span>, мы осуществляем отправку товара в Ваш регион за отдельную стоимость.</p>
                <h3 className='delivery__title'>Как отправляется товар?</h3>
                <p  className='delivery__text'>Мы собираем ваш заказ на нашем складе в день заказа и передаем его в транспортную компанию для доставки.</p>
                <p  className='delivery__text'>Если товара нет в наличии на нашем складе, мы формируем запрос поставщику и, как только товар готов, он отправляется напрямую в транспортную компанию для доставки.</p>
            </div>
        </div>

    );
};

export default Delivery;