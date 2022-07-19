import { date, number, object, string } from "yup";

const REQUIRED_ERROR = "Please provide a value";

export const userSchema = object({
  name: string()
    .max(256, "Name cannot be longer than 256 characters")
    .required("Please provide a valid name"),
  email: string()
    .max(500, "Email cannot be longer than 500 characters")
    .email("Please provide a valid email")
    .required("Please provide an email"),
  password: string().required(REQUIRED_ERROR),
  caloriesPerDay: number().positive("Please provide a positive no."),
});

export const dateSchema = date()
  .transform((value) => new Date(value))
  .max(new Date(), "Please provide a valid date");

export const mealSchema = object({
  name: string()
    .max(256, "Name cannot be longer than 256 characters")
    .required(REQUIRED_ERROR),
  calories: number()
    .positive("Please provide a positive no.")
    .required(REQUIRED_ERROR),
  price: number()
    .positive("Please provide a positive no.")
    .required(REQUIRED_ERROR),
  date: dateSchema,
  time: string().required(REQUIRED_ERROR),
});
