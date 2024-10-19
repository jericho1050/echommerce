import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products";
import productReducer from "./product";
import { persistedAuthReducer } from "./auth";
import snackbarReducer from "./snackbar";
const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: persistedAuthReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
