// pages/api/hello.js
import { getTweedSDK } from "@/services/tweed";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tweedClient = await getTweedSDK();

  const userId = "11";
  const userEmail = "demo@paytweed.com";

  const answer = await tweedClient.handleMessageFromFrontend(
    req.body.message,
    userId,
    userEmail
  );
  res.send({ answer });
}
