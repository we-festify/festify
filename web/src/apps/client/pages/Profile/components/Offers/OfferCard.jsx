import React from "react";
import styles from "./Offers.module.css";
import { BiCopy } from "react-icons/bi";
import { formatDateTimeFromNow } from "../../../../../../utils/time";
import { toast } from "../../../../components/Toast";
import useModal from "../../../../../../hooks/useModal/useModal";
import OfferDetailsModal from "./OfferDetailsModal";

const OfferCard = ({ promotion = {} }) => {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  const [DetailsModal, { open: openDetails }] = useModal(OfferDetailsModal);

  const handleCopyCode = () => {
    toast.promise(navigator.clipboard.writeText(promotion.promoCode), {
      loading: "Copying promo code...",
      success: "Promo code copied!",
      error: "Failed to copy promo code",
    });
  };

  return (
    <div className={styles.offerCard}>
      <DetailsModal promotionId={promotion._id} />
      <div className={styles.left + " ticket-left"}>
        <div className={styles.offerValue}>{promotion.discountValue}</div>
        <div className={styles.offerText}>
          <span>{promotion.discountType === "percentage" ? "%" : "₹"}</span>
          <span>Off</span>
        </div>
      </div>
      <div className={styles.borderDotted} />
      <div className={styles.right + " ticket-right"}>
        <div className={styles.promoCode}>
          <div className={styles.offerHeader}>
            <p className={styles.name}>{promotion.name}</p>
            {new Date(promotion.expiry) < nextWeek && (
              <span className={styles.expiry}>
                {formatDateTimeFromNow(promotion.expiry, {
                  prefix: "Expires in ",
                  skipDate: true,
                })}
              </span>
            )}
          </div>
          <div className={styles.promo} role="button" onClick={handleCopyCode}>
            <p className={styles.code}>{promotion.promoCode}</p>
            <BiCopy className={styles.icon} />
          </div>
          <p className={styles.description}>
            <span className={styles.readMore} onClick={() => openDetails()}>
              View details
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
