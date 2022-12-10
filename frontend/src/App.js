import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/"/>;
};


const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={() => <h1>Main Page</h1>}/>
            </Switch>
        </Layout>
    );
};

export default App;