import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;
  if (method === "POST") {
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      console.log(scriptUrl);
      console.log(method);
      console.log(body);

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const result = await response.json();
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: (err as Error).message || "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method ${req.method} Not Allowed");
  }
}
