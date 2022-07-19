import { createUser, findUsers } from "@/helpers/user";
import { withPermissions } from "@/utils/middlewares";

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const users = await findUsers();
        return res.status(200).json({ data: users });

      case "POST":
        const user = await createUser(req.body);
        return res.status(201).json({ data: user });

      default:
        return res.status(404).json({ message: "Method not found." });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default withPermissions("admin")(handler);
