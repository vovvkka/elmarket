import React, { useEffect } from 'react';
import ProfileForm from '../components/UI/ProfileForm/ProfileForm';
import NotActivatedWarning from '../components/NotActivatedWarning/NotActivatedWarning';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, getProfile } from '../store/actions/usersActions';
import profileIcon from '../assets/svg/profile.svg';
import { fetchUserOrders } from '../store/actions/ordersActions';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import Spinner from "../components/UI/Spinner/Spinner";

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.users.profile);
    const orders = useSelector((state) => state.orders.orders);
    const OLoading = useSelector(state => state.orders.loading);
    const PLoading = useSelector(state => state.users.loading);

    useEffect(() => {
        dispatch(fetchUserOrders());
        dispatch(getProfile());
    }, [dispatch]);

    const submitHandler = (profile) => {
        dispatch(editProfile(profile));
    };

    return (
        <>
            {OLoading || PLoading ? <Spinner/> : null}
            {profile && !profile.isActivated && <NotActivatedWarning />}
            <div className="profile">
                <h3 className="profile__title">
                    <img src={profileIcon} alt="Профиль" />
                    Личный кабинет
                </h3>
                <ProfileForm profile={profile} onSubmit={submitHandler} />
            </div>
            <div className="container-xs profile__orders">
                <h3 className="profile__title profile__title--form">
                    Последние заказы
                </h3>
                {orders?.length ? (
                    <OrdersTable userTable orders={orders} isArchive={false} />
                ) : (
                    <p>У вас еще не было покупок.</p>
                )}
            </div>
        </>
    );
};

export default Profile;
