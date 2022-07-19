import {
  createContext,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Snackbar } from "./Snackbar";
import { Confirmation } from "./Confirmation";

const Type = {
  Snackbar: "SNACKBAR",
  Confirmation: "CONFIRMATION",
  Idle: "IDLE",
};

export const FeedbackContext = createContext({
  showSnackbar: () => {},
  showConfirmation: () => {},
  handleClose: () => {},
});

export const FeedbackProvider = forwardRef(({ children }, ref) => {
  const [type, setType] = useState(Type.Idle);
  const props = useRef({
    message: "",
    variant: "error",
    handleConfirm: () => {},
  });

  const showSnackbar = useCallback((_message, _variant) => {
    props.current.message = _message;
    props.current.variant = _variant || "error";
    setType(Type.Snackbar);
  }, []);

  const showConfirmation = useCallback((args) => {
    props.current.message = args.message;
    props.current.handleConfirm = args.handleConfirm || (() => {});
    setType(Type.Confirmation);
  }, []);

  const handleClose = useCallback(() => {
    setType(Type.Idle);
  }, []);

  useImperativeHandle(ref, () => ({
    showSnackbar,
    showConfirmation,
    handleClose,
  }));

  return (
    <FeedbackContext.Provider
      value={{ showSnackbar, showConfirmation, handleClose }}
    >
      {children}
      <Snackbar
        open={type === Type.Snackbar}
        message={props.current.message}
        variant={props.current.variant}
        handleClose={handleClose}
      />
      <Confirmation
        open={type === Type.Confirmation}
        message={props.current.message}
        handleClose={handleClose}
        handleConfirm={props.current.handleConfirm}
      />
    </FeedbackContext.Provider>
  );
});

FeedbackProvider.displayName = "FeedbackProvider";
