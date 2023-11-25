import React from "react";
import styles from "./DetailsModal.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "./../../../../../../../../state/redux/auth/authSlice";

const DetailsModal = ({ close, participation }) => {
  const user = useSelector(selectUser);
  const { event, members } = participation;
  const leader = members.find((member) => member._id === participation.leader);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{event.name}</h2>
        <button className={styles.close} onClick={close}>
          &times;
        </button>
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>Details</h2>
        <div className={styles.item}>
          <h3 className={styles.key}>Leader</h3>
          <p className={styles.value}>{leader.name}</p>
        </div>
        <div className={styles.item}>
          <h3 className={styles.key}>Contact Email</h3>
          <p className={styles.value}>{leader.email}</p>
        </div>
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>Team Members</h2>
        {members.map((member) => (
          <div key={member._id} className={styles.listTile}>
            <div className={styles.left}>
              <span className={styles.avatar}>
                {member.name.charAt(0).toUpperCase()}
              </span>
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.email}>{member.email}</p>
              </div>
            </div>
            <div className={styles.right}>
              {member._id === leader._id && (
                <span className={styles.extra}>Leader</span>
              )}
              {member._id === user._id && (
                <span className={styles.extra}>(You)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsModal;
