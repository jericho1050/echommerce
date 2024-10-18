import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  product: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getProductFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getProduct, getProductSuccess, getProductFailure } =
  productSlice.actions;
export const productSelector = (state) => state.product;
export default productSlice.reducer;

export function fetchProduct(id) {
  return async (dispatch) => {
    dispatch(getProduct());

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REST_API_URL}/api/products/${id}`
      );
      const data = await response.json();

      dispatch(getProductSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getProductFailure());
    }
  };
}
