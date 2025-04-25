import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import { sendOtp, getUser } from "../api/routes";

// Initial state
const initialValues = {
    data: null,
    fetching: false,
    error: null,
    user: null
};

// Action types
const ACTION_TYPE = {
    SEND_OTP_REQUEST: "SEND_OTP_REQUEST",
    SEND_OTP_SUCCESS: "SEND_OTP_SUCCESS",
    SEND_OTP_FAILUIR: "SEND_OTP_FAILUIR",
    VERIFY_OTP_REQUEST: "VERIFY_OTP_REQUEST",
    VERIFY_OTP_SUCCESS: "VERIFY_OTP_SUCCESS",
    VERIFY_OTP_FAILURE: "VERIFY_OTP_FAILURE",
    CREATE_ACCOUNT_REQUEST: "CREATE_ACCOUNT_REQUEST",
    CREATE_ACCOUNT_SUCCESS: "CREATE_ACCOUNT_SUCCESS",
    CREATE_ACCOUNT_FAILURE: "CREATE_ACCOUNT_FAILURE"
};

// Reducer function
export default function AuthReducer(state = initialValues, action) {
    switch (action.type) {
        case ACTION_TYPE.SEND_OTP_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.SEND_OTP_SUCCESS:
            return { ...state, fetching: false, data: action.payload };
        case ACTION_TYPE.SEND_OTP_FAILUIR:
            return { ...state, fetching: false, error: action.payload };
        case ACTION_TYPE.CREATE_ACCOUNT_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.CREATE_ACCOUNT_SUCCESS:
            return { ...state, fetched: false, data: action.payload };
        case ACTION_TYPE.CREATE_ACCOUNT_FAILURE:
            return { ...state, fetching: false, error: action.payload };
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
                    payload: { user: data.user }
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

export const verifyOtpAction = (otp, callBack) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.VERIFY_OTP_REQUEST,
            });
            const result = await axios.post(`${baseUrl}/api${verifyOtp}`, otp);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.VERIFY_OTP_SUCCESS,
                    payload: { user: result.data.message }
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

export const getCurrentUser = (id, callBack) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.CREATE_ACCOUNT_REQUEST,
            });
            const result = await axios.get(`${baseUrl}/api${getUser}?${id}`);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.CREATE_ACCOUNT_SUCCESS,
                    payload: { user: result.data.message }
                });
                callBack && callBack();
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.CREATE_ACCOUNT_FAILURE,
                payload: error.message
            });
        }
    }
};
