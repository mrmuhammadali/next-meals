import { model, models, Schema } from "mongoose";

const MealSchema = new Schema(
  {
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { versionKey: false, timestamps: true },
);

export const MealModel = models.Meal || model("Meal", MealSchema);
