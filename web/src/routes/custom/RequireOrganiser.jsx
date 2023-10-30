import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsOrganiser,
} from "../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import Forbidden from "../../pages/Forbidden/Forbidden";

const RequireOrganiser = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isOrganiser = useSelector(selectIsOrganiser);

  if (!isLoggedIn) {
    return (
      <Navigate to="/a/login" state={{ from: window.location.pathname }} />
    );
  }

  if (!isOrganiser) {
    return (
      <Forbidden message="You must be an organiser to access this page." />
    );
  }

  return <Outlet />;
};

export default RequireOrganiser;
