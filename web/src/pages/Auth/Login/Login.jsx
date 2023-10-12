import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import MorphBackgroundDark from "../../../components/MorphBackgroundDark/MorphBackgroundDark";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(location.state?.from ? location.state.from : "/", {
        replace: true,
      });
    }
  }, [isLoggedIn, navigate, location]);

  return (
    <MorphBackgroundDark>
      <LoginForm />
    </MorphBackgroundDark>
  );
};

export default Login;
