import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Layout from './components/UI/Layout/Layout';
import MainPage from './containers/MainPage';
import NotFound from './containers/NotFound';
import Payment from './containers/Payment';
import Delivery from './containers/Delivery';
import AboutUs from './containers/AboutUs';
import Warranty from './containers/Warranty';
import Profile from './containers/Profile';
import Contacts from './containers/Contacts';
import Catalog from './containers/Catalog';
import SingleProduct from './containers/SingleProduct';
import Feedback from './containers/Feedback';
import Cart from './containers/Cart';
import Admin from './containers/Admin';
import Reviews from "./containers/Reviews";

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/" />;
};

const App = () => {
    const user = useSelector((state) => state.users.user);

    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/payment" exact component={Payment} />
                <Route path="/delivery" exact component={Delivery} />
                <Route path="/about-us" exact component={AboutUs} />
                <Route path="/contacts" exact component={Contacts} />
                <Route path="/warranty" exact component={Warranty} />
                <Route path="/catalog" exact component={Catalog} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/reviews/:id" exact component={Reviews} />
                <ProtectedRoute
                    path="/feedback"
                    component={Feedback}
                    isAllowed={user}
                    redirectTo="/"
                    exact
                />
                <ProtectedRoute
                    path="/feedback/:id"
                    component={Feedback}
                    isAllowed={user}
                    redirectTo="/"
                    exact
                />
                <Route path="/catalog/:id" exact component={SingleProduct} />
                <ProtectedRoute
                    path="/profile"
                    component={Profile}
                    isAllowed={user?.role === 'user'}
                    redirectTo="/"
                    exact
                />
                <ProtectedRoute
                    path="/admin"
                    component={Admin}
                    isAllowed={user?.role === 'admin'}
                    redirectTo="/"
                />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    );
};

export default App;
