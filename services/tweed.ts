import { TweedBackendSDK } from "@paytweed/backend-sdk";

const getNftCheckoutPayload = ({ nftId }: any) => {
  return {
    fiatCurrencyId: "USD",
    contractAddress: "0x987Bcdbf8CA730b0874cf8B555550c06831359f4",
    chain: "polygonAmoy",
    description: "Non-fungible token for demonstration of Tweed's capabilities",
    nftId: "test",
    title: "Pink Cat",
    tokenUri: "https://s6.imgcdn.dev/3BIYT.png",
    thumbnailPath: "https://s6.imgcdn.dev/3BIYT.png",
    priceInCents: 0,
    abi: "safeMint(toAddress address, tokenUri string)",
  };
};

export const getTweedSDK = async () => {
  const _client = await TweedBackendSDK.setup({
    apiKey: "YOUR_API_KEY",
    apiSecret: "YOUR_API_SECRET",
    defaultBlockchainIds: ["polygonAmoy"],
    callbacks: {
      getNftPurchaseData: async ({ nftId }) => {
        return getNftCheckoutPayload(nftId);
      },
    },
  });
  return _client;
};
