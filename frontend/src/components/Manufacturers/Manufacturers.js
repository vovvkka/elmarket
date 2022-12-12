import React from 'react';
import legrand from '../../assets/legrand.png';
import iek from '../../assets/iek.png';
import dkc from '../../assets/dkc.png';
import abb from '../../assets/abb.png';
import schneider from '../../assets/schneider.png';

const Manufacturers = () => {
    return (
        <div className='container'>
            <div className='manufacturers'>
                <h3 className='manufacturers__title'>Производители</h3>
                <div className='manufacturers__flex-container'>
                    <div className='manufacturers__cards'>
                        <div className='manufacturers__card manufacturers__card--1'>
                            <img className='manufacturers__image manufacturers__image--1' src={legrand} alt="legrand"/>
                        </div>
                        <div className='manufacturers__card'>
                            <img className='manufacturers__image' src={iek} alt="iek"/>
                        </div>
                        <div className='manufacturers__card'>
                            <img className='manufacturers__image' src={dkc} alt="dkc"/>
                        </div>
                        <div className='manufacturers__card'>
                            <img className='manufacturers__image' src={abb} alt="abb"/>
                        </div>
                        <div className='manufacturers__card'>
                            <img className='manufacturers__image' src={schneider} alt="schneider"/>
                        </div>
                    </div>
                    <div className='manufacturers__additional'>
                        <p className='manufacturers__number'>+60</p>
                        <p className='manufacturers__info'>Производетелей электротехнического оборудования</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manufacturers;