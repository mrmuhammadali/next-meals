import makeStyles from "@material-ui/styles/makeStyles";

const POPPER_WIDTH = 220;

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 0,
    gap: 20,
  },

  user: {
    ...theme.mixins.toolbar,
    background: theme.palette.primary.dark,
    width: POPPER_WIDTH,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",

    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      borderBottom: (open) =>
        open ? "" : `15px solid ${theme.palette.primary.main}`,
      borderRight: (open) =>
        open ? "" : `15px solid ${theme.palette.primary.dark}`,
      width: 0,
    },
  },

  title: {
    marginRight: "auto",
  },

  username: {
    fontWeight: 100,
    fontSize: 16,
  },

  popper: {
    width: POPPER_WIDTH,
    background: theme.palette.primary.dark,
    left: "5px !important",
  },

  divider: {
    background: "#888",
  },

  popButton: {
    textTransform: "none",
    borderRadius: 0,
    justifyContent: "start",
    fontWeight: 100,
    color: "#CCC",
    padding: "8px 20px",

    "&:hover": {
      color: "#FFF",
    },
  },
}));
