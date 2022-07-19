import axios from "axios";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { Form, Formik } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import { userSchema } from "@/utils/validationSchemas";
import { useMe, useUsers } from "@/apiHooks/useUsers";
import { InputField } from "../InputField";
import { useFeedback } from "../Feedback";
import { useStyles } from "./styles";

export const UserItemForm = ({ user, onClose }) => {
  const classes = useStyles();
  const { showSnackbar } = useFeedback();
  const hasId = Boolean(user?._id);
  const { data, mutate } = useUsers({ fallbackData: [] });
  const { data: me, mutate: mutateMe } = useMe({ fallbackData: {} });

  return (
    <Drawer
      className={classes.drawer}
      open={Boolean(user)}
      classes={{ paper: classes.drawerPaper }}
      anchor="right"
      onClose={onClose}
    >
      <Typography variant="h6" className={classes.toolbar}>
        {hasId ? "Edit " : "Add "}User
      </Typography>
      <Divider />
      <Formik
        initialValues={user}
        validationSchema={hasId ? userSchema.omit(["password"]) : userSchema}
        onSubmit={(values, { setErrors }) => {
          if (hasId) {
            return axios
              .put(`/api/users/${values._id}`, values)
              .then((res) => res.data.data)
              .then((payload) =>
                me._id === payload._id ? mutateMe(payload, false) : payload,
              )
              .then((payload) =>
                mutate(
                  data.map((user) =>
                    user._id === payload._id ? payload : user,
                  ),
                  false,
                ),
              )
              .then(() => showSnackbar("User updated successfully.", "success"))
              .then(onClose)
              .catch((err) => {
                const { errors } = err.response.data;
                if (errors) setErrors(errors);
              });
          }
          return axios
            .post("/api/users", values)
            .then((res) => res.data.data)
            .then((payload) => mutate(data.concat(payload), false))
            .then(() => showSnackbar("User added successfully.", "success"))
            .then(onClose)
            .catch((err) => {
              const { errors } = err.response.data;
              if (errors) setErrors(errors);
            });
        }}
      >
        {({ dirty, isValid, isSubmitting }) => {
          return (
            <Form className={classes.form}>
              <InputField className={classes.field} name="name" label="Name" />
              <InputField
                className={classes.field}
                name="email"
                label="Email"
              />
              <InputField
                className={classes.field}
                name="password"
                label="Password"
                type="password"
              />
              <InputField
                className={classes.field}
                name="caloriesPerDay"
                label="Calories / Day"
                type="number"
              />
              <InputField
                select
                className={classes.field}
                name="role"
                label="Role"
                disabled={user?._id === me._id}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="regular">Regular</MenuItem>
              </InputField>
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
          );
        }}
      </Formik>
    </Drawer>
  );
};
