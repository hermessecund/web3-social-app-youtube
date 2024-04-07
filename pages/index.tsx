import { useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.statusContainer}>
        hello
      </div>
      </div>
    </main>
  );
};

export default Home;
