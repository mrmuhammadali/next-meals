import makeStyles from "@material-ui/styles/makeStyles";

export const useStyles = makeStyles({
  root: {
    padding: "15px",
    width: "85%",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.75fr 3fr",
    gap: 15,
  },

  chart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "400px",
  },

  title: {
    textAlign: "center",
    margin: "10px auto",
  },
});
