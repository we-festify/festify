import { Route, Routes } from "react-router-dom";
import BannersList from "./BannersList";
import CreateBanner from "./CreateBanner";
import EditBanner from "./EditBanner";

const BannersIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<BannersList />} />
      <Route path="/create" element={<CreateBanner />} />
      <Route path="/edit/:bannerId" element={<EditBanner />} />
    </Routes>
  );
};

export default BannersIndex;
