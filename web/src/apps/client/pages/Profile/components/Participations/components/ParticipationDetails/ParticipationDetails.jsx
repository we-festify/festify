import styles from "./ParticipationDetails.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../../../state/redux/auth/authSlice";
import Avatar from "../../../../../../components/Avatar/Avatar";
import Modal from "../../../../../../components/Modal/Modal";
import ListTile from "../../../../../../components/ListTile/ListTile";

const ParticipationDetails = ({ close, participation = {} }) => {
  const user = useSelector(selectUser);
  const { event, members } = participation;

  if (!participation || !event || !members) {
    return null;
  }

  const leader = members.find((member) => member._id === participation.leader);

  return (
    <Modal title={event.name} close={close}>
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
          <ListTile
            key={member._id}
            leading={
              <Avatar
                image={member.image}
                avatarCode={member.avatarCode}
                name={member.name}
                size={40}
              />
            }
            title={member.name}
            subtitle={member.email}
            trailing={
              (member._id === leader._id && (
                <span className={styles.extra}>(Leader)</span>
              )) ||
              (member._id === user._id && (
                <span className={styles.extra}>(You)</span>
              ))
            }
          />
        ))}
      </div>
    </Modal>
  );
};

export default ParticipationDetails;
