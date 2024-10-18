import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products";
import productReducer from "./product";
import { persistedAuthReducer } from "./auth";

const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: persistedAuthReducer,
});

export default rootReducer;
