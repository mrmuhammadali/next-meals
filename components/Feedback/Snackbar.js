import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MuiSnackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import { useStyles } from "./styles";

export const Snackbar = ({ message, open, variant, handleClose }) => {
  const classes = useStyles();

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={message}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        }
      />
    </MuiSnackbar>
  );
};
