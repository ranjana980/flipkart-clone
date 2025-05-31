

// Initial state
const initialValues = {
    menu: false
};

// Action types
const ACTION_TYPE = {
    OPEN_MENU: "OPEN_MENU",
};

// Reducer function
export default function StyleRducer(state = initialValues, action) {
    switch (action.type) {
        case ACTION_TYPE.OPEN_MENU:
            return { ...state, menu: action.payload };
        default:
            return state;
    }
}



