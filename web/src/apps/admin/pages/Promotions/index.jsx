import { Route, Routes } from "react-router-dom";
import CreatePromotion from "./CreatePromotion";
import EditPromotion from "./EditPromotion";
import PromotionsList from "./PromotionsList";

const PromotionIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<PromotionsList />} />
      <Route path="/create" element={<CreatePromotion />} />
      <Route path="/edit/:id" element={<EditPromotion />} />
    </Routes>
  );
};

export default PromotionIndex;
