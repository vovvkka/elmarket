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


const rootReducer = combineReducers({
    users: usersSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
    categories: categoriesSlice.reducer,
});

const persistedState = loadFromLocalStorage();
const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
    preloadedState: persistedState,
});


store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user,
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