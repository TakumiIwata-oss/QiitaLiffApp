import type { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;

  if (method === "POST") {
    try {
      const url = "https://api.line.me/v2/bot/message/push";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          AUthorization: `Bearer ${process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN}`,
        },
        body,
      });
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method ${req.method} Not Allowed");
  }
}
