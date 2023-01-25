import React, { useEffect } from 'react';
import ProfileForm from '../components/UI/ProfileForm/ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, getProfile } from '../store/actions/usersActions';
import profileIcon from '../assets/svg/profile.svg';
import { fetchUserOrders } from '../store/actions/ordersActions';
import OrdersTable from '../components/OrdersTable/OrdersTable';

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.users.profile);
    const orders = useSelector((state) => state.orders.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
        dispatch(getProfile());
    }, [dispatch]);

    const submitHandler = (profile) => {
        dispatch(editProfile(profile));
    };

    return (
        <div className="profile">
            <h3 className="profile__title">
                <img src={profileIcon} alt="Профиль" />
                Личный кабинет
            </h3>
            <ProfileForm profile={profile} onSubmit={submitHandler} />
            <div className="container-xs">
                <h3 className="profile__title profile__title--form">
                    Последние заказы
                </h3>
                {orders.length ? (
                    <OrdersTable userTable orders={orders} isArchive={false} />
                ) : (
                    <p>У вас еще не было покупок.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
