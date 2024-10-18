import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  products: [],
  loading: false,
  hasErrors: false,
};

// A slice for products with our three reducers

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.loading = true;
    },
    getProductsSuccess: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getProductsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice

export const { getProducts, getProductsSuccess, getProductsFailure } = productsSlice.actions;

// A selector
export const productsSelector = (state) => state.products;

export default productsSlice.reducer;

// Asynchronous thunk action
export function fetchProducts() {
  return async (dispatch) => {
    dispatch(getProducts());

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REST_API_URL}/api/products/`
      );
      const data = await response.json();

      dispatch(getProductsSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(getProductsFailure());
    }
  };
}
