import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import FixedBackdrop from "../../../components/FixedBackdrop/FixedBackdrop";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword = () => {
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
    <FixedBackdrop>
      <ForgotPasswordForm />
    </FixedBackdrop>
  );
};

export default ForgotPassword;
