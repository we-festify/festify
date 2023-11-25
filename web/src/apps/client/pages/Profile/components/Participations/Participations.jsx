import React from "react";
import styles from "./Participations.module.css";
import { useGetParticipationsBySelfQuery } from "../../../../../../state/redux/participants/participantsApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../state/redux/auth/authSlice";
import Card from "./components/Card/Card";

const Participations = () => {
  const user = useSelector(selectUser);
  const {
    data: { participations } = {},
    isLoading,
    error,
  } = useGetParticipationsBySelfQuery();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Participations</h2>
      <div className={styles.participations}>
        {participations?.length === 0 && <p>No participations</p>}
        {participations?.map((participation) => (
          <Card key={participation._id} participation={participation} />
        ))}
      </div>
    </div>
  );
};

export default Participations;
