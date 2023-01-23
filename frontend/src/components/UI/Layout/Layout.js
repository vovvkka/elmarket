import React from 'react';
import HeaderDesktop from "../Header/HeaderDesktop";
import {useLocation} from "react-router-dom";
import Banner from "../../Banner/Banner";
import {useMediaQuery} from "react-responsive";
import HeaderMobile from "../Header/HeaderMobile";
import Footer from "../Footer/Footer";

const Layout = ({children}) => {
    const location = useLocation();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <div className="wrapper">
            {location.pathname === '/' ?
                <div className='background-wrapper'>
                    {!isMobile ? <HeaderDesktop mainPage/> : <HeaderMobile mainPage/>}
                    <Banner/>
                </div> :
                <>
                    {!isMobile ? <HeaderDesktop/> : <HeaderMobile/>}
                </>
            }
            <div className='main'>
                    {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;