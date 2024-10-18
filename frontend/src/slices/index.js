import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products";
import productReducer from "./product";

const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
});

export default rootReducer;
