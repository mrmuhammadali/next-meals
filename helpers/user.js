import { validateYupSchema, yupToFormErrors } from "formik";
import { ValidationError } from "yup";

import { UserModel } from "@/models/User";
import { userSchema } from "@/utils/validationSchemas";

const EMAIL_NOT_FOUND = "Email does not exists in our records.";
const DUPLICATE_EMAIL = "Email address already exists.";

export const findUserByEmail = (email) =>
  UserModel.findOne({ email }).catch(() =>
    Promise.reject({ errors: { email: EMAIL_NOT_FOUND } }),
  );

export const findUserById = (id) =>
  UserModel.findById(id).select("-password").lean();

export const findUsers = () => UserModel.find({}).select("-password").lean();

export const deleteUser = (_id) => UserModel.deleteOne({ _id });

export const createUser = (payload) =>
  validateYupSchema(payload, userSchema, false)
    .then(() => new UserModel(payload).save())
    .then((user) => {
      user.password = "";
      return user;
    })
    .catch((error) => {
      if (error instanceof ValidationError)
        return Promise.reject({ errors: yupToFormErrors(error) });

      return Promise.reject({ errors: { email: DUPLICATE_EMAIL } });
    });

export const updateUser = (_id, payload) => {
  if (typeof payload !== "object" || Object.keys(payload).length === 0)
    return Promise.reject({ message: "Provided request body is invalid." });

  return validateYupSchema(
    payload,
    userSchema.pick(Object.keys(payload)),
    false,
  )
    .then(() => UserModel.updateOne({ _id }, payload, { runValidators: true }))
    .then(() => findUserById(_id))
    .catch((error) => {
      if (error instanceof ValidationError)
        return Promise.reject({ errors: yupToFormErrors(error) });

      return Promise.reject({ errors: { email: DUPLICATE_EMAIL } });
    });
};
