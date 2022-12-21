import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import MainPage from "./containers/MainPage";
import NotFound from "./containers/NotFound";
import Payment from "./containers/Payment";
import Delivery from "./containers/Delivery";
import AboutUs from "./containers/AboutUs";
import Warranty from "./containers/Warranty";
import Profile from "./containers/Profile";
import Contacts from "./containers/Contacts";
import Catalog from "./containers/Catalog";
import SingleProduct from "./containers/SingleProduct";
import Feedback from "./containers/Feedback";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/"/>;
};

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/payment" exact component={Payment}/>
                <Route path="/delivery" exact component={Delivery}/>
                <Route path="/about-us" exact component={AboutUs}/>
                <Route path="/contacts" exact component={Contacts}/>
                <Route path="/warranty" exact component={Warranty}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/catalog" exact component={Catalog}/>
                <Route path="/feedback" exact component={Feedback}/>
                <Route path="/catalog/product-id" exact component={SingleProduct}/>
                <Route component={NotFound}/>
            </Switch>
        </Layout>
    );
};

export default App;