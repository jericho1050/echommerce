import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { authSelector, isAuthenticatedSelector } from "../slices/auth";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { role, token } = useSelector(authSelector);

  useEffect(() => {
    if (location.pathname.includes("/account") && !isAuthenticated) {
      navigate("/signin");
    }
  });

  if (token && isAuthenticated && role !== "seller") {
    navigate("/");
  }

  return <Outlet />;
}
