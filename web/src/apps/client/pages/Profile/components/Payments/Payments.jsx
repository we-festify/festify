import { useState } from "react";
import styles from "./Payments.module.css";
import { useGetPaymentsBySelfQuery } from "../../../../../../state/redux/payments/paymentsApi";
import { formatDateTime } from "../../../../../../utils/time";
import PaymentDetails from "./PaymentDetails";
import useModal from "../../../../../../hooks/useModal/useModal";

const Payments = () => {
  const { data: { payments } = {} } = useGetPaymentsBySelfQuery();
  const [viewPaymentIndex, setViewPaymentIndex] = useState(null);
  const [PaymentDetailsModal, { open: openPaymentDetails }] =
    useModal(PaymentDetails);

  const handleViewPaymentDetails = (index) => {
    setViewPaymentIndex(index);
    setTimeout(() => {
      openPaymentDetails();
    }, 100);
  };

  return (
    <div className={styles.container}>
      <PaymentDetailsModal payment={payments?.[viewPaymentIndex]} />
      <h2 className={styles.title}>Payments History</h2>
      <div className={styles.payments}>
        {payments?.length === 0 && (
          <p className={styles.empty}>No payments yet</p>
        )}
        {payments?.map((payment, index) => (
          <div
            className={styles.payment}
            key={payment._id}
            onClick={() => handleViewPaymentDetails(index)}
          >
            <div className={styles.left}>
              <p className={styles.description}>{payment.description}</p>
              <p className={styles.date}>
                {formatDateTime(payment.createdAt || new Date())}
              </p>
            </div>
            <div className={styles.middle}>
              <p className={styles.status + " " + styles[payment.status]}>
                {payment.status}
              </p>
            </div>
            <div className={styles.right}>
              <p className={styles.amount + " " + styles[payment.status]}>
                ₹ {payment.amount / 100}
              </p>
            </div>
            <div className={styles.actions}>
              <div
                className={styles.action}
                onClick={() => handleViewPaymentDetails(index)}
              >
                Details
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
