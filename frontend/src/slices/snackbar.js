import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  status: "",
  id: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.open = true;
      state.status = action.payload.status;
      state.id = action.payload.id;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;