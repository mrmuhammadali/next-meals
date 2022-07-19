import axios from "axios";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Form, Formik } from "formik";
import makeStyles from "@material-ui/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import { InputField } from "@/components/InputField";
import { useFeedback } from "@/components/Feedback";
import { useMe } from "@/apiHooks/useUsers";
import { userSchema } from "@/utils/validationSchemas";

const useStyles = makeStyles({
  root: {
    width: "40%",
    margin: "20px auto",
  },
  form: {
    padding: "10px",
  },
  field: {
    height: 55,
  },
});

const validationSchema = userSchema.omit(["email", "password"]);

const PageSettings = () => {
  const classes = useStyles();
  const { showSnackbar } = useFeedback();
  const { data, mutate } = useMe();

  return (
    <main className={classes.root}>
      <Typography variant="h6" align="center">
        Account Settings
      </Typography>
      <Divider />
      <Formik
        enableReinitialize
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={(values, { setErrors }) =>
          axios
            .put(`/api/users/me`, values)
            .then((res) => mutate(res.data.data, false))
            .then(() =>
              showSnackbar("User settings updated successfully.", "success"),
            )
            .catch((err) => {
              const { errors } = err.response.data;
              if (errors) setErrors(errors);
            })
        }
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form className={classes.form}>
            <InputField className={classes.field} name="name" label="Name" />
            <InputField className={classes.field} name="email" label="Email" />
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
              disabled
              select
              className={classes.field}
              name="role"
              label="Role"
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
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default PageSettings;
