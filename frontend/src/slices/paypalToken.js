import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  acess_token: null,
  status: "idle",
  error: null,
  token_type: null,
};

const paypalTokenSlice = createSlice({
  name: "paypalToken",
  initialState,
  reducers: {
    getToken: (state) => {
      return state.acess_token;
    },
    setToken: (state, action) => {
      state.acess_token = action.payload.access_token;
      state.token_type = action.payload.token_type;
    },
    clearToken: (state) => {
      state.acess_token = null;
    },
  },
});
export const { setToken } = paypalTokenSlice.actions;
export default paypalTokenSlice.reducer;
export const accessTokenSelector = (state) => state.paypalToken;

export function getAccessToken() {
  return async (dispatch) => {
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_PAYPAL_CLIENT_SECRET;
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      }
    );

    const data = await response.json();
    dispatch(setToken(data.access_token));
  };
}
