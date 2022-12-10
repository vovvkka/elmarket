import React from 'react';

const Layout = ({children}) => {
    return (
        <div className='main'>
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default Layout;