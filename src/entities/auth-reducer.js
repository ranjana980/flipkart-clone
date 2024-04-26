import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import { sendOtp } from "../api/routes";

// Initial state
const initialValues = {
    data: null,
    fetching: false,
    error: null,
};

// Action types
const ACTION_TYPE = {
    SEND_OTP_REQUEST: "SEND_OTP_REQUEST",
    SEND_OTP_SUCCESS: "SEND_OTP_SUCCESS",
    SEND_OTP_FAILUIR: "SEND_OTP_FAILUIR"
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
            const result = await axios.post(`${baseUrl}${sendOtp}`, data);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.SEND_OTP_SUCCESS,
                    payload: { email: data.email }
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
