import { useState } from "react";
import styles from "./Registration.module.css";
import { useCreateParticipantMutation } from "../../../../../../state/redux/participants/participantsApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../state/redux/auth/authSlice";
import Button from "../../../../atoms/Button";
import Modal from "../../../../components/Modal/Modal";
import PaymentService from "../../../../../../services/payment";
import { toast } from "../../../../components/Toast";

const Registration = ({ event = {}, close }) => {
  const user = useSelector(selectUser);
  const [participant, setParticipant] = useState({
    event: event._id,
    leader: user?._id,
    members: [user?._id],
    teamName: "",
  });
  const [error, setError] = useState(null);
  const [membersInput, setMembersInput] = useState("");
  const [createParticipant] = useCreateParticipantMutation();
  const [promoCode, setPromoCode] = useState("");

  const handleChange = (e) => {
    setParticipant({
      ...participant,
      [e.target.name]: e.target.value,
    });
  };

  const handleTeamMembersChange = (e) => {
    let members = e.target.value
      .split(",")
      .map((member) => member.trim())
      .filter((member) => member !== "");
    members = [...members, user._id];
    members = [...new Set(members)];
    if (members.length < event.minTeamSize) {
      setError(`Minimum team size is ${event.minTeamSize}`);
    } else if (members.length >= event.maxTeamSize) {
      // equal because leader is also a member
      setError(`Maximum team size is ${event.maxTeamSize}`);
    } else {
      setError(null);
    }
    setMembersInput(e.target.value);
    setParticipant({
      ...participant,
      members: members,
    });
  };

  const handleRemoveMember = (index) => {
    let members = participant.members.filter((_, i) => i !== index);
    members = [...members, user._id];
    members = [...new Set(members)];
    setMembersInput(members.join(", "));
    setParticipant({
      ...participant,
      members: members,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { type, order } = await createParticipant({
        participant,
        promoCode,
      }).unwrap();
      if (type === "participant") {
        toast.success("Registered successfully");
        close();
      }
      if (type === "order" && order) {
        close();
        await PaymentService.displayPaymentPopup({
          user,
          order,
          description: `Registration for ${event.name}`,
        });
      }
    } catch (err) {
      setError(err.data?.message);
      toast.error(
        err.data?.message || err.error?.message || "Unable to register"
      );
    }
  };

  if (!event || !user) {
    return (
      <Modal
        title={!event ? "Event not found" : "Login to register"}
        close={close}
      />
    );
  }

  return (
    <Modal title={event.name} close={close}>
      <div className={styles.participantDetails}>
        <div className={styles.item}>
          <p className={styles.key}>
            {event.minTeamSize > 1 ? "Team Leader" : "Participant"}
          </p>
          <p className={styles.value}>{user.name}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Contact Email</p>
          <p className={styles.value}>{user.email}</p>
        </div>
        <div className={styles.item + " " + styles.price}>
          <p className={styles.key}>Price</p>
          <p className={styles.value}>
            {event.registrationFeesInINR > 0
              ? `₹ ${event.registrationFeesInINR}`
              : "Free"}
          </p>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {event.minTeamSize > 1 && (
          <div className={styles.formGroup}>
            <label htmlFor="teamName">Team Name</label>
            <input
              type="text"
              name="teamName"
              id="teamName"
              required
              className={styles.input}
              onChange={handleChange}
            />
          </div>
        )}
        {event.minTeamSize > 1 && (
          <div className={styles.formGroup}>
            <label htmlFor="teamMembers">Team Members</label>
            <textarea
              type="text"
              name="teamMembers"
              id="teamMembers"
              className={styles.input}
              onChange={handleTeamMembersChange}
              value={membersInput}
              placeholder="Enter comma separated IDs of your team members."
            />
            <div className={styles.members}>
              {participant.members.map((member, index) => (
                <div className={styles.member} key={index}>
                  <div className={styles.name}>{member}</div>
                  <button
                    className={styles.remove}
                    onClick={() => handleRemoveMember(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {event.registrationFeesInINR > 0 && (
          <div className={styles.formGroup}>
            <label htmlFor="promoCode">Promo Code</label>
            <input
              type="text"
              name="promoCode"
              id="promoCode"
              className={styles.input}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
        <Button variant="secondary" type="submit" className={styles.submit}>
          {event.registrationFeesInINR > 0 ? "Pay and Confirm" : "Confirm"}
        </Button>
      </form>
    </Modal>
  );
};

export default Registration;
