import axios from "axios";
import AccountCircle from "@material-ui/icons/AccountCircleRounded";
import Button from "@material-ui/core/Button";
import Email from "@material-ui/icons/AlternateEmailRounded";
import Fingerprint from "@material-ui/icons/FingerprintRounded";
import Fireplace from "@material-ui/icons/FireplaceRounded";
import { Form, Formik } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import Router from "next/router";

import { AuthLayout } from "@/components/AuthLayout";
import { InputField } from "@/components/InputField";
import { useFeedback } from "@/components/Feedback";
import { userSchema } from "@/utils/validationSchemas";

const PageRegister = () => {
  const { showSnackbar } = useFeedback();
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        caloriesPerDay: 2100,
      }}
      validationSchema={userSchema}
      onSubmit={(values, { setErrors }) =>
        axios
          .post("/api/register", values)
          .then(() => Router.push("/login"))
          .then(() =>
            showSnackbar(
              "You have successfully registered, please login with your credentials.",
              "success",
            ),
          )
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
              name="name"
              label="Full Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <InputField
              name="email"
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <InputField
              name="password"
              label="Password"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Fingerprint fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <InputField
              name="caloriesPerDay"
              label="No. of calories per day"
              type="number"
              inputProps={{ min: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Fireplace fontSize="small" />
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
              Register
            </Button>
          </Form>
        </AuthLayout>
      )}
    </Formik>
  );
};

export default PageRegister;
