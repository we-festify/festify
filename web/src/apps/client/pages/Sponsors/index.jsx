import FixedBackdrop from "../../../../components/FixedBackdrop/FixedBackdrop";
import Navbar from "../../components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Sponsors from "./Sponsors";

const SponsorsIndex = () => {
  return (
    <FixedBackdrop>
      <Navbar />
      <Routes>
        <Route path="/" element={<Sponsors />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </FixedBackdrop>
  );
};

export default SponsorsIndex;
