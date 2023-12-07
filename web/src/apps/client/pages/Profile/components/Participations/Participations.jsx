import React from "react";
import styles from "./Participations.module.css";
import { useGetParticipationsBySelfQuery } from "../../../../../../state/redux/participants/participantsApi";
import Card from "./components/Card/Card";

const Participations = () => {
  const {
    data: { participations } = {},
    isLoading,
    error,
  } = useGetParticipationsBySelfQuery();

  return (
    <div className={styles.container}>
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
