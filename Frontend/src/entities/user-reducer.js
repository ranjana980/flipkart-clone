import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import { getUser, addUser, updateUser, deleteUser } from "../api/routes";

// Initial state
const initialValues = {
    fetching: false,
    error: null,
    userList: null
};

// Action types
const ACTION_TYPE = {
    GET_USER_REQUEST: "GET_USER_REQUEST",
    GET_USER_SUCCESS: "GET_USER_SUCCESS",
    GET_USER_FAILURE: "GET_USER_FAILURE",
    ADD_USER_REQUEST: "ADD_USER_REQUEST",
    ADD_USER_SUCCESS: "ADD_USER__SUCCESS",
    ADD_USER_FAILURE: "ADD_USER__FAILURE",
    UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
    UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
    UPDATE_USER_FAILURE: "UPDATE_USER_FAILURE",
    DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
    DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
    DELETE_USER_FAILURE: "DELETE_USER_FAILURE",
};

// Reducer function
export default function UserReducer(state = initialValues, action) {
    switch (action.type) {
        case ACTION_TYPE.GET_USER_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.GET_USER_SUCCESS:
            return { ...state, fetched: false, userList: action.payload };
        case ACTION_TYPE.GET_USER_FAILURE:
            return { ...state, fetching: false, error: action.payload };
        case ACTION_TYPE.ADD_USER_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.ADD_USER_SUCCESS:
            return { ...state, fetched: false, userList: action.payload };
        case ACTION_TYPE.ADD_USER_FAILURE:
            return { ...state, fetching: false, error: action.payload };
        case ACTION_TYPE.UPDATE_USER_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.UPDATE_USER_SUCCESS:
            return { ...state, fetched: false, userList: action.payload };
        case ACTION_TYPE.UPDATE_USER_FAILURE:
            return { ...state, fetching: false, error: action.payload };
        case ACTION_TYPE.DELETE_USER_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.DELETE_USER_SUCCESS:
            return { ...state, fetched: false, userList: action.payload };
        case ACTION_TYPE.DELETE_USER_FAILURE:
            return { ...state, fetching: false, error: action.payload };
        default:
            return state;
    }
}



export const getUserAction = () => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.GET_USER_REQUEST,
            });
            const result = await axios.get(`${baseUrl}/api${getUser}`);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.GET_USER_SUCCESS,
                    payload: [...result.data.data]
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.GET_USER_FAILURE,
                payload: error.message
            });
        }
    }
}

export const addUserAction = () => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.ADD_USER_REQUEST,
            });
            const result = await axios.get(`${baseUrl}/api${addUser}`);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.ADD_USER_SUCCESS,
                    payload: [...result.data.data]
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.ADD_USER_FAILURE,
                payload: error.message
            });
        }
    }
};

export const updateUserAction = (id, data) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.UPDATE_USER_REQUEST,
            });
            const result = await axios.post(`${baseUrl}/api${updateUser}`, { logged_id_user_id: id, data });
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.UPDATE_USER_SUCCESS,
                    payload: [...result.data.data]
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.UPDATE_USER_FAILURE,
                payload: error.message
            });
        }
    }
};

export const deleteUserAction = (id) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.DELETE_USER_REQUEST,
            });
            const result = await axios.delete(`${baseUrl}/api${deleteUser}/${id}`);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.DELETE_USER_SUCCESS,
                    payload: [...result.data.data]
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.DELETE_USER_FAILURE,
                payload: error.message
            });
        }
    }
};

