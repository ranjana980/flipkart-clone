import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import { getProducts, updateProduct, addUser, deleteProduct } from "../api/routes";

// Initial state
const initialValues = {
    fetching: false,
    error: null,
    productList: null
};

// Action types
const ACTION_TYPE = {
    GET_PRODUCTS_REQUEST: "GET_PRODUCTS_REQUEST",
    GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
    GET_PRODUCTS_FAILURE: "GET_PRODUCTS_FAILURE",
    ADD_PRODUCT_REQUEST: "ADD_PRODUCT_REQUEST",
    ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",
    ADD_PRODUCT_FAILURE: "ADD_PRODUCT_FAILURE",
    UPDATE_PRODUCT_REQUEST: "UPDATE_PRODUCT_REQUEST",
    UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",
    UPDATE_PRODUCT_FAILURE: "UPDATE_PRODUCT_FAILURE",
    DELETE_PRODUCT_REQUEST: "DELETE_PRODUCT_REQUEST",
    DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
    DELETE_PRODUCT_FAILURE: "DELETE_PRODUCT_FAILURE",

};

// Reducer function
export default function ProductReducer(state = initialValues, action) {
    switch (action.type) {
        case ACTION_TYPE.GET_PRODUCTS_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.GET_PRODUCTS_SUCCESS:
            return { ...state, fetched: false, productList: action.payload };
        case ACTION_TYPE.GET_PRODUCTS_FAILURE:
            return { ...state, fetching: false, error: action.payload };
        case ACTION_TYPE.ADD_PRODUCT_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.ADD_PRODUCT_SUCCESS:
            return { ...state, fetching: false, productList: action.payload };
        case ACTION_TYPE.ADD_PRODUCT_FAILURE:
            return { ...state, fetching: false, error: action.payload, productList: null };
        case ACTION_TYPE.UPDATE_PRODUCT_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.UPDATE_PRODUCT_SUCCESS:
            return { ...state, fetching: false, productList: action.payload };
        case ACTION_TYPE.UPDATE_PRODUCT_FAILURE:
            return { ...state, fetching: false, error: action.payload, productList: null };
        case ACTION_TYPE.DELETE_PRODUCT_REQUEST:
            return { ...state, fetching: true };
        case ACTION_TYPE.DELETE_PRODUCT_SUCCESS:
            return { ...state, fetching: false, productList: action.payload };
        case ACTION_TYPE.DELETE_PRODUCT_FAILURE:
            return { ...state, fetching: false, error: action.payload, productList: null };
        default:
            return state;
    }
}



export const getProductsAction = () => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.GET_PRODUCTS_REQUEST,
            });
            const result = await axios.get(`${baseUrl}/api${getProducts}`);
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.GET_PRODUCTS_SUCCESS,
                    payload: [...result.data.data]
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.GET_PRODUCTS_FAILURE,
                payload: error.message
            });
        }
    }
}

export const addProductAction = (data, callBack) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.ADD_PRODUCT_REQUEST,
            });
            const result = await axios.get(`${baseUrl}/api${addUser}`, { data })
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.ADD_PRODUCT_SUCCESS,
                    payload: [...result.data.data]
                });
                callBack && callBack(result.data.data)
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.ADD_PRODUCT_FAILURE,
                payload: error.message
            });
        }
    }
};


export const updateProductAction = (id) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.UPDATE_PRODUCT_REQUEST,
            });
            const result = await axios.get(`${baseUrl}/api${updateProduct}/${id}}`)
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.UPDATE_PRODUCT_SUCCESS,
                    payload: [...result.data.data]
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.UPDATE_PRODUCT_FAILURE,
                payload: error.message
            });
        }
    }
};

export const deleteProductAction = (id) => {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTION_TYPE.DELETE_PRODUCT_REQUEST,
            });
            const result = await axios.delete(`${baseUrl}/api${deleteProduct}/${id}`)
            if (result.data.code === 200) {
                dispatch({
                    type: ACTION_TYPE.DELETE_PRODUCT_SUCCESS,
                    payload: [...result.data.data]
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE.DELETE_PRODUCT_FAILURE,
                payload: error.message
            });
        }
    }
};





