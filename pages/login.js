import axios from "axios";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import FingerprintRounded from "@material-ui/icons/FingerprintRounded";
import { Form, Formik } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import makeStyles from "@material-ui/styles/makeStyles";
import Router from "next/router";

import { AuthLayout } from "@/components/AuthLayout";
import { InputField } from "@/components/InputField";
import { userSchema } from "@/utils/validationSchemas";

const useStyles = makeStyles({
  field: {
    minHeight: 85,
  },
});

const validationSchema = userSchema.omit(["name", "caloriesPerDay"]);

const PageLogin = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors }) =>
        axios
          .post("/api/login", values)
          .then(() => Router.replace("/"))
          .catch((err) => {
            const { errors } = err.response.data;
            if (errors) setErrors(errors);
          })
      }
    >
      {({ dirty, isValid, isSubmitting }) => (
        <AuthLayout>
          <Form>
            <InputField
              name="email"
              label="Email"
              margin="none"
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />

            <InputField
              name="password"
              label="Password"
              type="password"
              margin="none"
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FingerprintRounded />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!dirty || !isValid || isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        </AuthLayout>
      )}
    </Formik>
  );
};

export default PageLogin;
