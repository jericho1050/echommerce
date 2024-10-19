import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { openSnackbar, closeSnackbar } from "../../slices/snackbar";

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const { open, status, id } = useSelector((state) => state.snackbar);

//   const handleClick = () => {
//     dispatch(openSnackbar({ status: "success", id: "12345" }));
//   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Transaction {status}: {id}
        </Alert>
      </Snackbar>
    </div>
  );
}
