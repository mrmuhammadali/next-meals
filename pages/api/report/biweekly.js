import isAfter from "date-fns/isAfter";
import subDays from "date-fns/subDays";

import { findMeals } from "@/helpers/meal";
import { withPermissions } from "@/utils/middlewares";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const biweeklyMeals = await findMeals({
        timestamp: { $gte: subDays(new Date(), 14) },
      });
      const currentWeek = subDays(new Date(), 7);
      const currentWeekMeals = biweeklyMeals.filter((meal) => {
        return isAfter(meal.timestamp, currentWeek);
      });
      return res.status(200).json({
        data: {
          currentWeek: currentWeekMeals.length,
          lastWeek: biweeklyMeals.length - currentWeekMeals.length,
        },
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  return res.status(404).json({ message: "Method not found." });
};

export default withPermissions("admin")(handler);
