import { deleteMeal, findMealById, updateMeal } from "@/helpers/meal";
import { withPermissions } from "@/utils/middlewares";

const handler = async (req, res, permittedUser) => {
  try {
    const {
      query: { id },
    } = req;
    // Check if the user is an admin or the owner of the meal
    const meal = await findMealById(id);
    if (
      permittedUser.role === "regular" &&
      !meal.owner &&
      meal.owner !== permittedUser._id
    ) {
      return res
        .status(403)
        .json({ message: "You don't have permission to do that." });
    }
    switch (req.method) {
      case "GET":
        return res.status(200).json({ data: meal });

      case "PUT":
        const updatedMeal = await updateMeal(id, req.body);
        return res.status(200).json({ data: updatedMeal });

      case "DELETE":
        await deleteMeal(id);
        return res.status(200).json({ data: {} });

      default:
        res.status(404).json({ message: "Method not found." });
        break;
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export default withPermissions(["admin", "regular"])(handler);
