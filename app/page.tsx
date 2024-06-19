"use client";

import { useAuth, useTweed } from "@paytweed/core-react";
import { hooks } from "@paytweed/frontend-sdk-react";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const { connect, logout } = useAuth();
  const { client, loading } = useTweed();
  const tweed = hooks.useTweedFrontendSDK();

  const [isWalletExist, setIsWalletExist] = useState(false);

  async function handleWalletCreation() {
    if (isWalletExist) return;
    await tweed.wallet.create();
    setIsWalletExist(true);
  }

  useEffect(() => {
    if (!isWalletExist) handleWalletCreation();
  }, [isWalletExist]);

  function handleConnect() {
    if (!client) return;
    connect({});
  }

  function handleLogout() {
    if (!client) return;
    logout();
  }

  function handleBuynft() {
    tweed.nft.buyWithFiat({
      nftId: "1",
    });
  }

  return (
    <main className={styles.main}>
      <div
        className={styles.description}
        style={{ display: "flex", flexDirection: "column", gap: "7rem" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <h1>tweed X next.js</h1>
          <h3>
            This is an example of how to use tweed WaaS and Payments with
            next.js
          </h3>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {loading ? (
            <h2> loading... </h2>
          ) : (
            <>
              <button onClick={handleConnect} className={styles.button}>
                Connect
              </button>
              <button onClick={handleLogout} className={styles.button}>
                Logout
              </button>
              <button onClick={handleBuynft} className={styles.button}>
                Buy NFTs
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
