import { updateUser } from "@/helpers/user";
import { withPermissions } from "@/utils/middlewares";

const handler = async (req, res, permittedUser) => {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ data: permittedUser });

    case "PUT":
      try {
        const user = await updateUser(permittedUser._id, req.body);
        return res.status(200).json({ data: user });
      } catch (error) {
        return res.status(400).json(error);
      }

    default:
      return res.status(404).json({ message: "Method not found." });
  }
};

export default withPermissions(["admin", "regular"])(handler);
