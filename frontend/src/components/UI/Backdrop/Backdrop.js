import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setNonScroll} from "../../../store/slices/usersSlice";

const Backdrop = ({show, clicked}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (show) {
            dispatch(setNonScroll(true));
        } else {
            dispatch(setNonScroll(false));
        }
    }, [show]);

    return show ? <div className="Backdrop" onClick={clicked} /> : null;
};

export default Backdrop;