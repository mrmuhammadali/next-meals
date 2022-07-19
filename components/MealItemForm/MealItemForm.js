import axios from "axios";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { Form, Formik } from "formik";
import Typography from "@material-ui/core/Typography";

import { getFormattedDate, getFormattedTime } from "@/utils/index";
import { InputField } from "../InputField";
import { mealSchema } from "@/utils/validationSchemas";
import { useMe } from "@/apiHooks/useUsers";
import { useMeals } from "@/apiHooks/useMeals";
import { useFeedback } from "../Feedback";
import { useStyles } from "./styles";
import { UserDropdown } from "../UserDropdown";

export const MealItemForm = ({ meal, onClose }) => {
  const { data: me } = useMe({ fallbackData: {} });
  const { data, mutate } = useMeals({ fallbackData: [] });
  const classes = useStyles();
  const { showSnackbar } = useFeedback();
  const timestamp = meal?.timestamp ? new Date(meal.timestamp) : new Date();

  const initialValues = {
    ...(meal || {}),
    date: getFormattedDate(timestamp),
    time: getFormattedTime(timestamp),
  };
  const hasId = Boolean(meal?._id);

  return (
    <Drawer
      className={classes.drawer}
      open={Boolean(meal)}
      classes={{ paper: classes.drawerPaper }}
      anchor="right"
      onClose={onClose}
    >
      <Typography variant="h6" className={classes.toolbar}>
        {hasId ? "Edit " : "Add "}Meal
      </Typography>
      <Divider />

      <Formik
        initialValues={initialValues}
        validationSchema={mealSchema}
        onSubmit={(values, { setErrors }) => {
          const body = {
            name: values.name,
            calories: values.calories,
            price: values.price,
            timestamp: new Date(`${values.date}T${values.time}`).toISOString(),
            owner: values.owner?._id,
          };

          // Update Meal
          if (hasId) {
            return axios
              .put(`/api/meals/${initialValues._id}`, body)
              .then((res) => res.data.data)
              .then((payload) =>
                mutate(
                  data.map((meal) =>
                    meal._id === payload._id ? payload : meal,
                  ),
                  false,
                ),
              )
              .then(onClose)
              .then(() => showSnackbar("Meal updated successfully.", "success"))
              .catch((err) => {
                const { errors } = err.response.data;
                if (errors) setErrors(errors);
              });
          }
          // Create Meal
          return axios
            .post(`/api/meals`, body)
            .then((res) => res.data.data)
            .then((payload) => mutate(data.concat(payload), false))
            .then(onClose)
            .then(() => showSnackbar("Meal added successfully.", "success"))
            .catch((err) => {
              const { errors } = err.response.data;
              if (errors) setErrors(errors);
            });
        }}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form className={classes.form}>
            <InputField
              className={classes.field}
              name="name"
              label="Meal Name"
            />
            <InputField
              className={classes.field}
              name="calories"
              label="No. of Calories"
              type="number"
            />
            <InputField
              className={classes.field}
              name="price"
              label="Price"
              type="number"
              InputProps={{ startAdornment: "$" }}
            />
            {me.role === "admin" && (
              <UserDropdown
                className={classes.field}
                name="owner._id"
                label="Owner"
              />
            )}
            <InputField
              className={classes.field}
              name="date"
              label="Date"
              type="date"
              inputProps={{ max: getFormattedDate(new Date()) }}
              InputLabelProps={{ shrink: true }}
            />
            <InputField
              className={classes.field}
              name="time"
              label="Time"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!dirty || !isValid || isSubmitting}
              type="submit"
            >
              {hasId ? "Update" : "Save"}
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};
