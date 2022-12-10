import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import MainPage from "./containers/MainPage";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/"/>;
};


const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={MainPage}/>
            </Switch>
        </Layout>
    );
};

export default App;