import AuthReducer from "../entities/auth-reducer"
import { combineReducers } from "redux";
import StyleRducer from "../entities/style-reducer";
import ProductReducer from "../entities/product-reducer";
import UserReducer from "../entities/user-reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductReducer,
  users: UserReducer,
  style: StyleRducer
});

export default rootReducer;