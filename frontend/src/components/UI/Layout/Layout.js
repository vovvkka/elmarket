import React from 'react';
import Header from "../Header/Header";
import {useLocation} from "react-router-dom";

const Layout = ({children}) => {
    const location = useLocation();

    return (
        <>
            {location.pathname === '/' ?
                <div className='background-wrapper'>
                    <Header/>
                </div> : <Header/>
            }
            <div className='main'>
                    {children}
            </div>
        </>
    );
};

export default Layout;