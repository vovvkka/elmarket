import React, {useEffect} from 'react';
import ProfileForm from '../components/UI/ProfileForm/ProfileForm';
import {useDispatch, useSelector} from 'react-redux';
import {editProfile, getProfile} from '../store/actions/usersActions';
import profileIcon from "../assets/svg/profile.svg";
import NotActivatedWarning from "../components/NotActivatedWarning/NotActivatedWarning";

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.users.profile);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const submitHandler = (profile) => {
        dispatch(editProfile(profile));
    };

    return (
        <>
            {(profile && !profile.isActivated) && <NotActivatedWarning/>}
            <div className="profile">
                <h3 className="profile__title">
                    <img src={profileIcon} alt="Профиль" />
                    Личный кабинет
                </h3>
                <ProfileForm profile={profile} onSubmit={submitHandler} />
            </div>
        </>
    );
};

export default Profile;
