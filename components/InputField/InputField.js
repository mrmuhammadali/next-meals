import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useStyles } from "./styles";

export const InputField = (props) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const invalid = Boolean(meta.error && meta.touched);
  const [visible, setVisible] = useState(false);
  const inputType = visible ? "text" : props.type;
  const InputProps =
    props.type !== "password"
      ? props.InputProps
      : {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setVisible((prevVisible) => !prevVisible)}
              >
                {visible ? (
                  <Visibility fontSize="inherit" />
                ) : (
                  <VisibilityOff fontSize="inherit" />
                )}
              </IconButton>
            </InputAdornment>
          ),
          ...(props.InputProps || {}),
        };

  return (
    <TextField
      name={field.name}
      variant="outlined"
      fullWidth
      margin="dense"
      className={classes.field}
      error={invalid}
      helperText={invalid && meta.error}
      value={field.value || ""}
      onBlur={field.onBlur}
      onChange={field.onChange}
      {...props}
      type={inputType}
      InputProps={InputProps}
    />
  );
};
