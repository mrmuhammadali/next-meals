import { deleteUser, findUserById, updateUser } from "@/helpers/user";
import { withPermissions } from "@/utils/middlewares";

const handler = async (req, res) => {
  const {
    query: { id },
    method,
    body,
  } = req;

  try {
    switch (method) {
      case "GET":
        const user = await findUserById(id);
        return res.status(200).json({ data: user });

      case "PUT":
        const updatedUser = await updateUser(id, body);
        return res.status(200).json({ data: updatedUser });

      case "DELETE":
        await deleteUser(id);
        return res.status(200).json({ data: {} });

      default:
        return res.status(404).json({ message: "Method not found." });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default withPermissions("admin")(handler);
