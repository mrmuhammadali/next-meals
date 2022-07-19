import makeStyles from "@material-ui/styles/makeStyles";

export const useStyles = makeStyles({
  root: {
    padding: "15px",
    width: "80%",
    margin: "0 auto",
    flexGrow: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  button: {
    alignSelf: "flex-end",
  },

  users: {
    flexGrow: 1,
    overflow: "auto",
  },

  flex: {
    display: "flex",
  },
});
