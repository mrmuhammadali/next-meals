import { object } from "yup";
import { validateYupSchema, yupToFormErrors } from "formik";
import { ValidationError } from "yup";

import { dateSchema, mealSchema } from "@/utils/validationSchemas";
import { MealModel } from "@/models/Meal";

const validationSchema = mealSchema
  .omit(["date", "time"])
  .concat(object({ timestamp: dateSchema }));

export const findMealById = (id) =>
  MealModel.findById(id).lean().populate("owner", "_id name email");

export const findMeals = (filter = {}) =>
  MealModel.find(filter).lean().populate("owner", "_id name email");

export const deleteMeal = (id) => MealModel.findByIdAndDelete(id);

export const createMeal = (payload) =>
  validateYupSchema(payload, validationSchema, false)
    .then(() => MealModel.create(payload))
    .then((meal) => findMealById(meal._id))
    .catch((error) => {
      if (error instanceof ValidationError) {
        const errors = yupToFormErrors(error);
        errors.date = errors.timestamp;
        delete errors.timestamp;
        return Promise.reject({ errors });
      }

      return Promise.reject({ message: error.message });
    });

export const updateMeal = (id, payload) => {
  if (typeof payload !== "object" || Object.keys(payload).length === 0)
    return Promise.reject({ message: "Provided request body is invalid." });

  return validateYupSchema(
    payload,
    validationSchema.pick(Object.keys(payload)),
    false,
  )
    .then(() =>
      MealModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      })
        .lean()
        .populate("owner", "_id name email"),
    )
    .catch((error) => {
      if (error instanceof ValidationError) {
        const errors = yupToFormErrors(error);
        errors.date = errors.timestamp;
        delete errors.timestamp;
        return Promise.reject({ errors });
      }

      return Promise.reject({ message: error.message });
    });
};
