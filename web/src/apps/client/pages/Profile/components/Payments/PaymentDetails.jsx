import styles from "./Payments.module.css";
import Modal from "../../../../components/Modal/Modal";

const PaymentDetails = ({ payment, close }) => {
  return (
    <Modal title="Payment Details" close={close}>
      <div className={styles.details}>
        <div className={styles.item}>
          <p className={styles.key}>Festify Payment ID</p>
          <p className={styles.value}>{payment?._id}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Description</p>
          <p className={styles.value}>{payment?.description}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Amount</p>
          <p className={styles.value}>₹ {payment?.amount / 100}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Status</p>
          <p className={styles.value + " " + styles[payment?.status]}>
            {payment?.status}
          </p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Created At</p>
          <p className={styles.value}>{payment?.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentDetails;
