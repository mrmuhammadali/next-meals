import { createMeal, findMeals } from "@/helpers/meal";
import { withPermissions } from "@/utils/middlewares";

const handler = async (req, res, permittedUser) => {
  try {
    switch (req.method) {
      case "GET":
        // Filter meals by user access
        const filter =
          permittedUser.role === "admin" ? {} : { owner: permittedUser._id };
        const meals = await findMeals(filter);
        return res.status(200).json({ data: meals });

      case "POST":
        // Check if the regular user is the owner of the meal
        if (permittedUser.role === "admin" || !req.body.owner) {
          req.body.owner = req.body.owner || permittedUser._id;
        } else if (req.body.owner !== permittedUser._id) {
          return res
            .status(403)
            .json({ message: "You don't have permission to do that." });
        }

        const meal = await createMeal(req.body);
        return res.status(201).json({ data: meal });

      default:
        return res.status(404).json({ message: "Method not found." });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default withPermissions(["admin", "regular"])(handler);
