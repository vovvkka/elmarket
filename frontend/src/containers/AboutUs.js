import React from 'react';
import aboutUs from '../assets/about-us.png';

const AboutUs = () => {
    return (
        <div className='about-us'>
            <div className='container-sm'>
                <h2 className='about-us__title'>О компании</h2>
                <p>Компания Anas-Электро с 2005 года осуществляет комплексные мелкооптовые и оптовые поставки электрооборудования, электротехнического оборудования, электроустановочных, светотехнических и электромонтажных изделий, электромонтажного инструмента и кабельной продукции ведущих мировых производителей по выгодным ценам. Вы покупаете те же cамые электро-товары, что и на рынке, но сделав заказ из дома и оформив доставку в любое удобное время.</p>
                <img className='about-us__img' src={aboutUs} alt="About Us"/>
                <h2 className='about-us__announcement'>Присоединяйтесь к числу тех, кто выбрал Компанию ANAS-Электро!</h2>
            </div>
        </div>
    );
};

export default AboutUs;