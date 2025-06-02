import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import { sendOtp, verifyOtp, adminAuth, getUser, logOutUser, addToCart, removeToCart } from "../api/routes";

// Initial state
const initialValues = {
    fetching: false,
    error: null,
    user: null,
};

// Action types
const ACTION_TYPE = {
    SEND_OTP_REQUEST: "SEND_OTP_REQUEST",
    SEND_OTP_SUCCESS: "SEND_OTP_SUCCESS",
    SEND_OTP_FAILUIR: "SEND_OTP_FAILUIR",
    VERIFY_OTP_REQUEST: "VERIFY_OTP_REQUEST",
    VERIFY_OTP_SUCCESS: "VERIFY_OTP_SUCCESS",
    VERIFY_OTP_FAILURE: "VERIFY_OTP_FAILURE",
    GET_CURRENT_USER_REQUEST: "GET_CURRENT_USER_REQUEST",
    GET_CURRENT_USER_SUCCESS: "GET_CURRENT_USER_SUCCESS",
    GET_CURRENT_USER_FAILURE: "GET_CURRENT_USER_FAILURE",
    ADMIN_AUTH_REQUEST: "ADMIN_AUTH_REQUEST",
    ADMIN_AUTH_SUCCESS: "ADMIN_AUTH_SUCCESS",
    ADMIN_AUTH_FAILURE: "ADMIN_AUTH_FAILURE",
    LOGOUT_USER_REQUEST: "LOGOUT_USER_REQUEST",
    LOGOUT_USER_SUCCESS: "LOGOUT_USER_SUCCESS",
    LOGOUT_USER_FAILURE: "LOGOUT_USER_FAILURE",
    ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
    ADD_TO_CART_SUCCESS: " ADD_TO_CART_SUCCESS",
    ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",
    REMOVE_TO_CART_REQUEST: "REMOVE_TO_CART_REQUEST",
    REMOVE_TO_CART_SUCCESS: " REMOVE_TO_CART_SUCCESS",
    REMOVE_TO_CART_SUCCESS: "REMOVE_TO_CART_SUCCESS",


};

// Reducer function
export default function AuthReducer(state = initialValues, action) {

    switch (action.type) {
        case ACTION_TYPE.SEND_OTP_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.SEND_OTP_SUCCESS:
            return { ...state, fetching: false, user: action.payload };
        case ACTION_TYPE.SEND_OTP_FAILUIR:
            return { ...state, fetching: false, error: action.payload };
        case ACTION_TYPE.VERIFY_OTP_REQUEST:
            return { ...state, fetching: true, user: null };
        case ACTION_TYPE.VERIFY_OTP_SUCCESS:
            return { ...state, fetching: false, user: action.payload };
        case ACTION_TYPE.VERIFY_OTP_FAILURE:
            return { ...state, fetching: false, error: action.payload, user: null };
        case ACTION_TYPE.GET_CURRENT_USER_REQUEST:
            return { ...state, fetching: true, user: null };
        case ACTION_TYPE.GET_CURRENT_USER_SUCCESS:
            return { ...state, fetching: false, user: action.payload };
        case ACTION_TYPE.GET_CURRENT_USER_FAILURE:
            return { ...state, fetching: false, error: action.payload, user: null };
        case ACTION_TYPE.ADMIN_AUTH_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.ADMIN_AUTH_SUCCESS:
            return { ...state, fetching: false, user: action.payload };
        case ACTION_TYPE.ADMIN_AUTH_FAILURE:
            return { ...state, fetching: false, error: action.payload, user: null };
        case ACTION_TYPE.LOGOUT_USER_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.LOGOUT_USER_SUCCESS:
            return { ...state, fetched: false, user: action.payload };
        case ACTION_TYPE.LOGOUT_USER_FAILURE:
            return { ...state, fetching: false, error: action.payload };
        case ACTION_TYPE.ADD_TO_CART_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.ADD_TO_CART_SUCCESS:
            return { ...state, fetching: false, user: action.payload };
        case ACTION_TYPE.ADD_TO_CART_FAILURE:
            return { ...state, fetching: false, error: action.payload, user: null };
        case ACTION_TYPE.REMOVE_TO_CART_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.REMOVE_TO_CART_SUCCESS:
            return { ...state, fetching: false, user: action.payload };
        case ACTION_TYPE.REMOVE_TO_CART_FAILURE:
            return { ...state, fetching: false, error: action.payload, user: null };
        default:
            return state;
    }
}



// API action function
export const sendOtpAction = (data, callBack) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.SEND_OTP_REQUEST,
            });
            const result = await axios.post(`${baseUrl}/api${sendOtp}`, data);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.SEND_OTP_SUCCESS,
                    payload: { user: result.data.data }
                });
                callBack && callBack();
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.SEND_OTP_FAILUIR,
                payload: error.message
            });
        }
    }
};

export const verifyOtpAction = (otp, id, callBack) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.VERIFY_OTP_REQUEST,
            });
            const result = await axios.post(`${baseUrl}/api${verifyOtp}`, { otp: otp.join(""), id: id });
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.VERIFY_OTP_SUCCESS,
                    payload: { ...result.data.data }
                });
                callBack && callBack();
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.VERIFY_OTP_FAILURE,
                payload: error.message
            });
        }
    }
}


export const adminAuthAction = (data, callback) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.ADMIN_AUTH_REQUEST
            });

            const result = await axios.post(`${baseUrl}/api${adminAuth}`, { data })
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.ADMIN_AUTH_SUCCESS,
                    payload: { ...result.data.data }
                });
                callback && callback(result.data.data);
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.ADMIN_AUTH_FAILURE,
                payload: error.message
            });
        }
    }
}

export const getCurrentUserAction = (id, callBack) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.GET_CURRENT_USER_REQUEST,
            });
            const result = await axios.get(`${baseUrl}/api${getUser}/${id}`);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.GET_CURRENT_USER_SUCCESS,
                    payload: { ...result.data.data }
                });
                callBack && callBack(result.data.data);
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.GET_CURRENT_USER_FAILURE,
                payload: error.message
            });
        }
    }
};

export const logOutUserAction = (id, callBack) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.LOGOUT_USER_REQUEST,
            });
            const result = await axios.get(`${baseUrl}/api${logOutUser}/${id}`);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.LOGOUT_USER_SUCCESS,
                    payload: { ...result.data.data }
                });
                callBack && callBack()
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.LOGOUT_USER_FAILURE,
                payload: error.message
            });
        }
    }
}


export const addToCartAction = (data) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.ADD_TO_CART_REQUEST
            });
            const result = await axios.post(`${baseUrl}/api${addToCart}`, { data })
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.ADD_TO_CART_SUCCESS,
                    payload: { ...result.data.data }
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.ADD_TO_CART_FAILURE,
                payload: error.message
            });
        }
    }
}

export const removeToCartAction = (data) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.REMOVE_TO_CART_REQUEST
            });
            const result = await axios.post(`${baseUrl}/api${removeToCart}`, { data })
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.REMOVE_TO_CART_SUCCESS,
                    payload: { ...result.data.data }
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.REMOVE_TO_CART_FAILURE,
                payload: error.message
            });
        }
    }
}




