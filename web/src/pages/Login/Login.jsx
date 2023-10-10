import React from "react";
import { useNavigate } from "react-router-dom";
import { selectAccessToken } from "../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);

  React.useEffect(() => {
    if (accessToken) {
      navigate("");
    }
  }, [accessToken, navigate]);

  return <div>Login</div>;
};

export default Login;
