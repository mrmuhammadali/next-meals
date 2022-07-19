import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const Confirmation = ({ open, message, handleConfirm, handleClose }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="confirmation-dialog"
    aria-describedby={message}
  >
    <DialogTitle>Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary" variant="outlined">
        Cancel
      </Button>
      <Button
        onClick={handleConfirm}
        color="primary"
        variant="contained"
        autoFocus
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);
