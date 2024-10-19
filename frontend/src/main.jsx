import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import SignIn, { action as signInAction } from "./components/sign-in/SignIn";
import SignUpSide, {
  action as signUpAction,
} from "./components/sign-up/SignUp";
import SellerDashboard from "./routes/Seller/Seller";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Index from "./routes/Index";
import { Provider } from "react-redux";
import ProductPage from "./components/Product/ProductPage";
import store from "./slices/store";
import Account, { loader as accountLoader } from "./routes/Account";
import ProtectedRoute from "./utils/ProtectedRoute";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3F71AF",
    },
    secondary: {
      main: "#112D4E",
    },
    background: {
      default: "F9F7F7",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "product/:productId",
            element: <ProductPage />,
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/account/:userId",
                element: <Account />,
                loader: accountLoader,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
    action: signInAction,
  },
  {
    path: "/signup",
    element: <SignUpSide />,
    action: signUpAction,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/seller/*",
        element: <SellerDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
