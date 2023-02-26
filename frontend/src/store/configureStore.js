import {combineReducers} from "redux";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import {configureStore} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import usersSlice from "./slices/usersSlice";
import thunk from "redux-thunk";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import ordersSlice from "./slices/ordersSlice";
import categoriesSlice from "./slices/categoriesSlice";
import watchListSlice from "./slices/watchListSlice";
import feedbackSlice from "./slices/feedbackSlice";
import contactsSlice from "./slices/contactsSlice";
import visitsSlice from "./slices/visitsSlice";

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
    categories: categoriesSlice.reducer,
    watchList: watchListSlice.reducer,
    feedback: feedbackSlice.reducer,
    contacts: contactsSlice.reducer,
    visits: visitsSlice.reducer,
});

const persistedState = loadFromLocalStorage();
const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: false,
    preloadedState: persistedState,
});


store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user,
        },
        cart: {
            products: store.getState().cart.products,
        },
    });
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}

    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response.data) {
        e.response = {data: {global: 'No internet!'}};
    }

    throw e;
});

export default store;