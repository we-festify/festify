import React from "react";
import { useNavigate } from "react-router-dom";
import { selectAccessToken } from "../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);

  React.useEffect(() => {
    if (accessToken) {
      navigate("");
    }
  }, [accessToken, navigate]);

  return <div>Register</div>;
};

export default Register;
