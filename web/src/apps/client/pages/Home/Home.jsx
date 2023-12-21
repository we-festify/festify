import React from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import FixedBackdrop from "../../../../components/FixedBackdrop/FixedBackdrop";

const Home = () => {
  return (
    <FixedBackdrop>
      <Navbar />
      Home
    </FixedBackdrop>
  );
};

export default Home;
