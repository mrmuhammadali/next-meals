import makeStyles from "@material-ui/styles/makeStyles";

export const useStyles = makeStyles({
  root: {
    padding: "15px",
    width: "85%",
    margin: "0 auto",
    flexGrow: 1,
    overflow: "hidden",
    display: "grid",
    gap: "15px",
    gridTemplateColumns: "1fr 350px",
    alignItems: "start",
  },

  meals: {
    height: "100%",
    overflow: "auto",
    gridRow: "1 / span 2",
  },

  flex: {
    display: "flex",
  },

  filters: {
    height: "fit-content",
    padding: "10px",
  },

  divider: {
    margin: "10px 0 5px",
  },

  note: {
    fontSize: "0.8rem",
    fontStyle: "italic",

    "&:before": {
      content: '""',
      display: "inline-block",
      height: "8px",
      width: "8px",
      borderRadius: "100%",
      background: "#f50057",
      marginRight: "3px",
    },
  },
});
