import subDays from "date-fns/subDays";

import { findMeals } from "@/helpers/meal";
import { withPermissions } from "@/utils/middlewares";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const meals = await findMeals({
        timestamp: { $gte: subDays(new Date(), 7) },
      });
      const caloriesSum = new Map();
      meals.forEach(({ owner, calories }) => {
        const prevEntry = caloriesSum.get(owner._id) || { sum: 0 };
        const sum = prevEntry.sum + calories;
        caloriesSum.set(owner._id, { sum, ownerName: owner.name });
      });
      const averages = Array.from(caloriesSum.values()).map(
        ({ sum, ownerName }) => ({ x: ownerName, y: Math.round(sum / 7) }),
      );
      return res.status(200).json({ data: averages });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  return res.status(404).json({ message: "Method not found." });
};

export default withPermissions("admin")(handler);
