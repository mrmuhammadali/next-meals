import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

export const Slate = ({ error, data, children }) => {
  const classes = useStyles();

  if (!data && !error) return <CircularProgress className={classes.loading} />;
  if (error)
    return (
      <Typography className={classes.text} color="error">
        {error.response?.data.message || error.message}
      </Typography>
    );
  if (typeof data === "object" && Object.keys(data).length < 1)
    return (
      <Typography className={classes.text}>
        There is no data available at the moment
      </Typography>
    );
  return children;
};
