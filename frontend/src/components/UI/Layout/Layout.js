import React from 'react';
import Header from "../Header/Header";

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className='main'>
                    {children}
            </div>
        </>
    );
};

export default Layout;