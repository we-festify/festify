import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./VerifyEmail/VerifyEmail";

const UtilityIndex = () => {
  return (
    <Routes>
      <Route path="verify-email" element={<VerifyEmail />} />
    </Routes>
  );
};

export default UtilityIndex;
