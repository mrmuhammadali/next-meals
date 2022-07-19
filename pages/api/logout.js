import { destroyCookie } from "nookies";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    destroyCookie({ res }, "token", { path: "/" });
    return res.status(204).end();
  }
  return res.status(404).json({ message: "Method not found." });
}
