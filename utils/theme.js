import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3d91ff",
    },
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: "none",
      },
    },

    MuiFormHelperText: {
      root: {
        marginTop: 0,
      },
      marginDense: {
        marginTop: 0,
      },
    },

    MuiTableHead: {
      root: {
        background: "#eff2f7",
      },
    },
    MuiTableCell: {
      root: {
        padding: "10px 12px",
      },
      head: {
        fontWeight: "bold",
        padding: "12px",
      },
    },
  },
});

export default theme;
