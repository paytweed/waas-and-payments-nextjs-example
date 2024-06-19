"use client";

import { Network, TweedProvider } from "@paytweed/core-react";
import { TweedFrontendSdkProvider } from "@paytweed/frontend-sdk-react";
import { useCallback } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const sendMessageToBackend = useCallback(async (message: string) => {
    const response = await fetch("/api/tweed", {
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const { answer } = await response.json();
    return answer;
  }, []);

  return (
    <TweedProvider
      applicationId="YOUR_APPLICATION_ID"
      options={{
        chains: [Network.POLYGON, Network.ETHEREUM],
      }}
    >
      <TweedFrontendSdkProvider
        defaultBlockchainIds={["polygonAmoy"]}
        sendMessageToBackend={sendMessageToBackend}
      >
        {children}
      </TweedFrontendSdkProvider>
    </TweedProvider>
  );
}
