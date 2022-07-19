import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

import { MealModel } from "./Meal";

const SALT_WORK_FACTOR = 10;
const hashPassword = (user, next) =>
  bcrypt
    .hash(user.password, SALT_WORK_FACTOR)
    .then((hash) => (user.password = hash))
    .then(() => next())
    .catch((err) => next(err));

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "regular" },
    caloriesPerDay: { type: Number, default: 2100 },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } },
);

UserSchema.pre("deleteOne", function (next) {
  MealModel.deleteMany({ owner: this._conditions._id }, next);
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  return hashPassword(this, next);
});

UserSchema.pre("updateOne", function (next) {
  if (!this._update.password) return next();
  return hashPassword(this._update, next);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const error = { errors: { password: "Please provide a correct password" } };
  return bcrypt
    .compare(candidatePassword, this.password)
    .then((isMatch) => (isMatch ? true : Promise.reject(error)))
    .catch(() => Promise.reject(error));
};

export const UserModel = models.User || model("User", UserSchema);
