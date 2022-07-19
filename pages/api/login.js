import nookies from "nookies";

import dbConnect from "@/utils/dbConnect";
import { findUserByEmail } from "@/helpers/user";
import { sign } from "@/utils/jwt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const { email, password } = req.body;
    try {
      const user = await findUserByEmail(email);
      await user.comparePassword(password);
      const token = await sign({
        _id: user._id.toString(),
        role: user.role,
      });
      nookies.set({ res }, "token", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      return res
        .status(200)
        .json({ message: "You have successfully logged in." });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  return res.status(404).json({ message: "Method not found." });
}
