import nookies from "nookies";

import { createUser } from "@/helpers/user";
import dbConnect from "@/utils/dbConnect";
import { sign } from "@/utils/jwt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    return createUser(req.body)
      .then((user) =>
        sign({
          _id: user._id.toString(),
          role: user.role,
        }),
      )
      .then((token) => {
        nookies.set(res, "token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        return res
          .status(200)
          .json({ message: "You have successfully logged in." });
      })
      .catch((error) => res.status(400).json(error));
  }
  return res.status(404).json({ message: "Method not found." });
}
