import { createContext } from "react";
import { useGetBannersByTargetQuery } from "../../redux/banner/bannerApi";
import { useLocation } from "react-router-dom";
import Banner from "../../../components/Banner";
import styles from "./Banner.module.css";

const BannersContext = createContext();

const BannersProvider = ({ children }) => {
  const location = useLocation();
  const { data: { banners } = {} } = useGetBannersByTargetQuery(
    location.pathname
  );

  return (
    <BannersContext.Provider value={banners}>
      <div className={styles.bannerContainer}>
        {banners?.map((banner) => (
          <Banner
            key={banner._id}
            text={banner.text}
            variant={banner.variant}
          />
        ))}
      </div>
      {children}
    </BannersContext.Provider>
  );
};

export default BannersProvider;
