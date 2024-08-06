import styles from "./EntryPassDetails.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../../../state/redux/auth/authSlice";
import Avatar from "../../../../../../components/Avatar/Avatar";
import Modal from "../../../../../../components/Modal/Modal";
import ListTile from "../../../../../../components/ListTile/ListTile";
import QRCode from "../../../../../../components/QRCode/QRCode";
import { formatDateTime } from "../../../../../../../../utils/time";
import { getQRDataFromEntryPass } from "../../../../../../../../utils/qr-code";

const EntryPassDetails = ({ close, entryPass = {} }) => {
  const user = useSelector(selectUser);
  const { event } = entryPass;

  if (!entryPass || !event) {
    return null;
  }

  return (
    <Modal title={event.name} close={close}>
      <div className={styles.details}>
        <QRCode data={getQRDataFromEntryPass(entryPass)} />
        <h2 className={styles.title}>Details</h2>
        <div className={styles.item}>
          <ListTile
            leading={
              <Avatar
                image={user.image}
                avatarCode={user.avatarCode}
                name={user.name}
                size={40}
              />
            }
            title={user.name}
            subtitle={user.email}
          />
        </div>
        <div className={styles.item}>
          <h3 className={styles.key}>Entry Pass Id</h3>
          <p className={styles.value}>{entryPass._id}</p>
        </div>
        <div className={styles.item + " " + styles.imp}>
          <h3 className={styles.key}>Status</h3>
          <p className={styles.value}>
            {entryPass.isUsed ? "Used" : "Not Used"}
          </p>
        </div>
        <div className={styles.item}>
          <h3 className={styles.key}>Used At</h3>
          <p className={styles.value}>{formatDateTime(entryPass.usedAt)}</p>
        </div>
      </div>
    </Modal>
  );
};

export default EntryPassDetails;
