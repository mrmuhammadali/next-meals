import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

import { useStyles } from "./styles";

export const AuthLayout = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const handleChange = (_, value) => {
    router.replace(value);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Tabs
          value={router.pathname}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab label="Login" value="/login" />
          <Tab label="Register" value="/register" />
        </Tabs>
        <Typography variant="h5" className={classes.title} color="primary">
          {router.pathname === "/login" ? "Login to " : "Register on "}
          Next Meals
        </Typography>
        {children}
      </Paper>
    </div>
  );
};
