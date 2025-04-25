import AuthReducer from "../entities/auth-reducer"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: AuthReducer
});

export default rootReducer;