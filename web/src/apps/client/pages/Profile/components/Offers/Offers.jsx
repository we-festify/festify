import { useGetAllMyPromotionsQuery } from "../../../../../../state/redux/promotions/promotionsApi";
import OfferCard from "./OfferCard";
import styles from "./Offers.module.css";

const Offers = () => {
  const { data: { promotions } = {} } = useGetAllMyPromotionsQuery();

  return (
    <>
      <h2 className={styles.title}>Offers</h2>
      <div className={styles.container}>
        {promotions?.length === 0 && (
          <p className={styles.noOffers}>No offers available</p>
        )}

        {promotions?.map((promotion) => (
          <OfferCard key={promotion._id} promotion={promotion} />
        ))}
      </div>
    </>
  );
};

export default Offers;
