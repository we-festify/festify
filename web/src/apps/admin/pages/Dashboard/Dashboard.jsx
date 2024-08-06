import styles from "./Dashboard.module.css";
import Grid, { GridItem } from "../../../../components/Grid/Grid";
import Card from "../../components/Card/Card";
import { getGreetings } from "../../../../utils/time";
import { selectUser } from "../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import greetingImage from "../../../../assets/images/admin-dashboard-greeting.png";

const Dashboard = () => {
  const user = useSelector(selectUser);
  return (
    <div className={styles.page}>
      <Grid columns={12}>
        <GridItem sm={12} md={12} lg={12}>
          <Card>
            <div className={styles.greeting}>
              <div className={styles.left}>
                <div className={styles.title}>
                  {getGreetings()}, <span>{user.name}</span>
                </div>
                <div className={styles.subtitle}>Have a nice day at work</div>
              </div>
              <div className={styles.right}>
                <div className={styles.image}>
                  <img src={greetingImage} alt="greeting" />
                </div>
              </div>
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Dashboard;
