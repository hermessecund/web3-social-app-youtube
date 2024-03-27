import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { truncateAddress } from "../utils/truncateAddress";
import { BigNumber } from "ethers";

type EventCardProps = {
    walletAddress: string;
    eventData: {
        newStatus: string;
        timeStamp: BigNumber;
    };
    onCreateAccount: (username: string, email: string) => void; // Callback function for creating an account
};

export default function EventCard(props: EventCardProps) {
    const { newStatus, timeStamp } = props.eventData;
    const date = new Date(timeStamp.toNumber() * 1000);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleCreateAccount = () => {
        // Call the parent component's callback function to create an account
        props.onCreateAccount(username, email);
        // Clear the input fields after creating the account
        setUsername("");
        setEmail("");
    };

    return (
        <div className={styles.eventCard}>
            <div className={styles.eventHeader}>
                <Link href={`account/${props.walletAddress}`} style={{ color: "white" }}>
                    <p className={styles.connectedAddress}>{truncateAddress(props.walletAddress)}</p>
                </Link>
                <p style={{ fontSize: "0.75rem" }}>{date.toLocaleString()}</p>
            </div>
            <p style={{ fontSize: "16px"}}>{newStatus}</p>
            <div className={styles.createAccountTab}>
                <h3>Create Account</h3>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleCreateAccount}>Create</button>
            </div>
        </div>
    );
}
