import { useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import UserStatus from "../components/user-status";
import StatusEvents from "../components/statusEvents";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingLottie from "../public/loadingLottie.json";

const Home: NextPage = () => {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(true);



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
