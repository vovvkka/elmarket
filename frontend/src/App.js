import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import MainPage from "./containers/MainPage";
import NotFound from "./containers/NotFound";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/"/>;
};


const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route component={NotFound}/>
            </Switch>
        </Layout>
    );
};

export default App;