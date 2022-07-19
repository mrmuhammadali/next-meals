import nookies from "nookies";

import dbConnect from "./dbConnect";
import { findUserById } from "@/helpers/user";
import { verify } from "./jwt";

export const withPermissions = (role) => (handler) => async (req, res) => {
  await dbConnect();
  try {
    const cookies = nookies.get({ req });
    const cookieUser = await verify(cookies.token);
    const dbUser = await findUserById(cookieUser._id);
    const isMatch =
      role instanceof Array ? role.includes(dbUser.role) : role === dbUser.role;
    if (!isMatch) {
      return res
        .status(403)
        .json({ message: "You don't have permission to do that." });
    }
    return handler(req, res, dbUser);
  } catch (error) {
    return res.status(401).json({ message: "You are not authorized." });
  }
};
