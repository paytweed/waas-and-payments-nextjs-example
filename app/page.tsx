"use client";
import { Network, useAuth, useTweed, useWeb3 } from "@paytweed/core-react";
import { hooks } from "@paytweed/frontend-sdk-react";
import { BrowserProvider } from "ethers";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const { connect, logout, isAuthenticated } = useAuth();
  const { client, loading: useTweedLoading } = useTweed();
  const { getEthereumProvider } = useWeb3();
  const tweed = hooks.useTweedFrontendSDK();

  const [isWalletExist, setIsWalletExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const getWalletAddress = useCallback(async () => {
    //if (!useTweedLoading) return;
    setIsLoading(true);
    try {
      const provider = await getEthereumProvider(Network.ETHEREUM_SEPOLIA);
      const web3provider = new BrowserProvider(provider);
      const signer = await web3provider.getSigner();
      const userAddress = await signer.getAddress();
      setWalletAddress(userAddress);
    } finally {
      setIsLoading(false);
    }
  }, [getEthereumProvider, useTweedLoading]);

  const handleConnect = useCallback(async () => {
    if (client) {
      await connect({});
      await getWalletAddress();
    }
  }, [client, connect, getWalletAddress]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     handleConnect();
  //   }
  // }, [isAuthenticated, handleConnect]);

  useEffect(() => {
    const checkIsWalletExist = async () => {
      const isExist = await tweed.wallet.exists();
      if (!isExist) {
        await tweed.wallet.create();
        setIsWalletExist(true);
      }
      setIsWalletExist(true);
    };

    checkIsWalletExist();
  }, [tweed]);

  const handleLogout = useCallback(() => {
    if (client) {
      logout();
    }
  }, [client, logout]);

  const handleBuynft = useCallback(async () => {
    await handleConnect();
    if (!walletAddress || !isWalletExist) return;
    tweed.nft.buyWithFiat({
      nftId: "1",
      toWalletAddress: walletAddress,
      customMintParams: {
        toAddress: walletAddress,
      },
    });
  }, [handleConnect, walletAddress, isWalletExist, tweed.nft]);

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
          {useTweedLoading ? (
            <h2> loading... </h2>
          ) : (
            <>
              <button
                disabled={isLoading}
                onClick={handleConnect}
                className={styles.button}
              >
                Connect
              </button>
              <button
                disabled={isLoading}
                onClick={handleLogout}
                className={styles.button}
              >
                Logout
              </button>
              <button
                disabled={isLoading}
                onClick={handleBuynft}
                className={styles.button}
              >
                Buy NFTs
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
