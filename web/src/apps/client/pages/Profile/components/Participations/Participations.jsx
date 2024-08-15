import styles from "./Participations.module.css";
import { useGetParticipationsBySelfQuery } from "../../../../../../state/redux/participants/participantsApi";
import Card from "./components/Card/Card";
import { useGetEntryPassesBySelfQuery } from "../../../../../../state/redux/entryPass/entryPassApi";

const Participations = () => {
  const {
    data: { participations } = {},
    isLoading: areParticipationsLoading,
    error,
  } = useGetParticipationsBySelfQuery();
  const { data: { entryPasses } = {}, isLoading: areEntryPassesLoading } =
    useGetEntryPassesBySelfQuery();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Participations</h2>
      {areParticipationsLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.participations}>
          {participations?.length > 0 ? (
            participations?.map((participation) => (
              <Card key={participation._id} participation={participation} />
            ))
          ) : (
            <p>No participations</p>
          )}
        </div>
      )}
      <h2 className={styles.title}>Entry Passes</h2>
      {areEntryPassesLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.participations}>
          {entryPasses?.length > 0 ? (
            entryPasses?.map((entryPass) => (
              <Card key={entryPass._id} entryPass={entryPass} />
            ))
          ) : (
            <p>No entry passes</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Participations;
