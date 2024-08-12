import React from "react";
import styles from "./Offers.module.css";
import { BiCopy } from "react-icons/bi";

const OfferCard = () => {
  return (
    <div className={styles.offerCard}>
      <div className={styles.left + " ticket-left"}>
        <div className={styles.offerValue}>20</div>
        <div className={styles.offerText}>
          <span>%</span>
          <span>Off</span>
        </div>
      </div>
      <div className={styles.borderDotted} />
      <div className={styles.right + " ticket-right"}>
        <div className={styles.promoCode}>
          <div className={styles.offerHeader}>
            <p className={styles.name}>EDM Pass for ISM</p>
            <span className={styles.expiry}>Expires in 2 days</span>
          </div>
          <div className={styles.promo}>
            <p className={styles.code}>EDMFORISM</p>
            <BiCopy className={styles.icon} />
          </div>
          <p className={styles.description}>
            {"This promotional code will give you an extra 20% off your entry pass when you purchase it at the Event Management System.".substring(
              0,
              60
            ) + "... "}
            <span className={styles.readMore}>Read More</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
