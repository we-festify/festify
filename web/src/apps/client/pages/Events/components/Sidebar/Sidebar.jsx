import styles from "./Sidebar.module.css";
import { useEventsPage } from "../../../../../../state/context/ClientEventsPage";

const Sidebar = () => {
  const { categories, selectedCategory, changeCategory } = useEventsPage();
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Categories</h2>
      <ul className={styles.categories}>
        <li
          className={selectedCategory === "all" ? styles.active : ""}
          onClick={() => changeCategory("all")}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={selectedCategory === category ? styles.active : ""}
            onClick={() => changeCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
