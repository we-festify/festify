import { useEffect, useState } from "react";
import styles from "./Sponsors.module.css";
import { useGetSponsorsQuery } from "../../../../state/redux/sponsor/sponsorsApi";

const Sponsors = () => {
  const { data: { sponsors } = {}, isLoading } = useGetSponsorsQuery();
  const [sponsorGroupsByPriority, setSponsorGroupsByPriority] = useState([]);

  useEffect(() => {
    if (sponsors) {
      let sponsorGroups = sponsors.reduce((acc, sponsor) => {
        if (!acc[sponsor.priority]) {
          acc[sponsor.priority] = [];
        }
        acc[sponsor.priority].push(sponsor);
        return acc;
      }, {});
      // Sort the sponsor groups by priority
      sponsorGroups = Object.keys(sponsorGroups)
        .sort((a, b) => a - b)
        .map((priority) => sponsorGroups[priority]);
      setSponsorGroupsByPriority(sponsorGroups);
    }
  }, [sponsors]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Powered by industry leaders and community
        </h1>
        {sponsors && (
          <div className={styles.groups}>
            {sponsorGroupsByPriority.map((sponsorGroup, index) => (
              <div
                className={styles.group}
                key={index}
                style={{ "--priority": sponsorGroup[0].priority }}
              >
                {sponsorGroup.map((sponsor) => (
                  <div className={styles.sponsor} key={sponsor._id}>
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      className={styles.logo}
                    />
                    <p className={styles.type}>{sponsor.type}</p>
                    <div className={styles.popover}>
                      <p className={styles.name}>{sponsor.name}</p>
                      <p className={styles.description}>
                        {sponsor.description}
                      </p>
                      <a
                        href={sponsor.websiteUrl}
                        target="_blank"
                        className={styles.link}
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sponsors;
