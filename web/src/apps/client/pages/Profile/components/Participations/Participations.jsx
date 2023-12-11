import React from "react";
import styles from "./Participations.module.css";
import { useGetParticipationsBySelfQuery } from "../../../../../../state/redux/participants/participantsApi";
import Card from "./components/Card/Card";
import { useGetEntryPassesBySelfQuery } from "../../../../../../state/redux/entryPass/entryPassApi";

const Participations = () => {
  const {
    data: { participations } = {},
    isLoading,
    error,
  } = useGetParticipationsBySelfQuery();
  const { data: { entryPasses } = {} } = useGetEntryPassesBySelfQuery();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Participations</h2>
      <div className={styles.participations}>
        {participations?.length === 0 && <p>No participations</p>}
        {participations?.map((participation) => (
          <Card key={participation._id} participation={participation} />
        ))}
      </div>
      <h2 className={styles.title}>Entry Passes</h2>
      <div className={styles.participations}>
        {participations?.length === 0 && <p>No entry passes</p>}
        {entryPasses?.map((entryPass) => (
          <Card key={entryPass._id} entryPass={entryPass} />
        ))}
      </div>
    </div>
  );
};

export default Participations;
