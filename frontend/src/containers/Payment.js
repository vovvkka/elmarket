import React from 'react';
import payment from "../assets/payment.png";

const Payment = () => {
    return (
        <div className='payment'>
            <div className='container-sm'>
                <div className='payment__block'>
                    <h2 className='payment__title'>Как оплатить заказ?</h2>
                    <p className='payment__text'>Компания Anas-Электро с 2005 года осуществляет комплексные мелкооптовые и оптовые поставки электрооборудования, электротехнического оборудования, электроустановочных, светотехнических и электромонтажных изделий, электромонтажного инструмента и кабельной продукции ведущих мировых производителей по выгодным ценам.</p>
                    <img className='payment__img' src={payment} alt="Payment"/>
                </div>
        </div>
        </div>
    );
};

export default Payment;