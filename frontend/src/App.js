import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
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
import {fetchContacts} from "./store/actions/contactsActions";
import ResetPassword from "./containers/ResetPassword";
import Sales from "./containers/Sales";
import SearchPage from "./containers/SearchPage";
import ScrollToTop from "./utils/ScrollToTop";
import Activated from "./containers/Activated";
import {getProfile} from "./store/actions/usersActions";
import {newVisit} from "./store/actions/visitsActions";
import {ToastContainer} from "react-toastify";
import 'react-toastify/scss/main.scss';

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/" />;
};

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const profile = useSelector((state) => state.users.profile);
    const nonScroll = useSelector((state) => state.users.nonScroll);

    useEffect(() => {
        dispatch(fetchContacts());
        dispatch(getProfile());
        dispatch(newVisit());
    }, [dispatch]);

    useEffect(() => {
        if (nonScroll) {
            document.body.classList.add('open');
        } else {
            document.body.classList.remove('open');
        }
    }, [nonScroll]);

    return (
        <Layout>
            <ScrollToTop />
            <ToastContainer style={{width: 400}}/>
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/payment" exact component={Payment} />
                <Route path="/sales" exact component={Sales} />
                <Route path="/delivery" exact component={Delivery} />
                <Route path="/about-us" exact component={AboutUs} />
                <Route path="/contacts" exact component={Contacts} />
                <Route path="/warranty" exact component={Warranty} />
                <Route path="/:id/activated" exact component={Activated} />
                <Route path="/search" exact component={SearchPage} />
                <Route path="/catalog" exact component={Catalog} />
                <Route path="/reviews/:id" exact component={Reviews} />
                <Route path="/reset-password/:id/:token" exact component={ResetPassword} />
                <ProtectedRoute
                    path="/cart"
                    component={Cart}
                    isAllowed={!user || user?.role !== 'admin'}
                    redirectTo="/"
                    exact
                />
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
                    isAllowed={user && profile?.isActivated}
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
