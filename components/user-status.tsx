import { ConnectWallet, Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Lottie  from "lottie-react";
import loadingLottie from "../public/loadingLottie.json";
import { truncateAddress } from "../utils/truncateAddress";
import Link from "next/link";

export default function UserStatus() {
    const address = useAddress();
    const [newStatus, setNewStatus] = useState("");
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const characterDecoration = characterCount >= 140 ? styles.characterCountOver : styles.characterCountUnder;

    const {
        contract
    } = useContract(STATUS_CONTRACT_ADDRESS);

    const createMessage = async () => {
        try {
            await contract.call("CreateMessage", [newStatus]);
            setIsStatusModalOpen(false);
            setNewStatus("");
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (!address) {
        return (
            <div>
                <ConnectWallet
                    modalSize="compact"
                    dropdownPosition={{
                        side: "bottom",
                        align: "start",
                    }}
                />
                <p>Please connect your wallet.</p>
            </div>
        );
    }

    return (
        <div className={styles.userContainer}>
            <div className={styles.statusHeader}>
                <p className={styles.connectedAddress}>{truncateAddress(address!)}</p>
            </div>
            
            <button
                className={styles.updateButton}
                onClick={() => setIsStatusModalOpen(true)}
            >Update</button>

            {isStatusModalOpen && (
                <div className={styles.statusModalContainer}>
                    <div className={styles.statusModal}>
                        <div className={styles.statusModalHeader}>
                            <p>New Status:</p>
                            <button
                                onClick={() => setIsStatusModalOpen(false)}
                            >Close</button>
                        </div>
                        <textarea
                            value={newStatus}
                            onChange={(e) => {
                                setNewStatus(e.target.value)
                                setCharacterCount(e.target.value.length)
                            }}
                            placeholder="Enter your status"
                        />
                        <div className={styles.characterCountContainer}>
                            <p className={characterDecoration}>{characterCount}/140</p>
                        </div>
                        <Web3Button
                            className={styles.statusModalButton}
                            contractAddress={STATUS_CONTRACT_ADDRESS}
                            action={createMessage}
                            isDisabled={characterCount === 0 || characterCount > 140}
                        >Update Status</Web3Button>
                    </div>
                </div>
            )}
        </div>
    );
}
