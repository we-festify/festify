import OfferCard from "./OfferCard";
import styles from "./Offers.module.css";

const Offers = () => {
  return (
    <>
      <h2 className={styles.title}>Offers</h2>
      <div className={styles.container}>
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </div>
    </>
  );
};

export default Offers;
