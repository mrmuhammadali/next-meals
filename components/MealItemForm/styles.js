import makeStyles from "@material-ui/styles/makeStyles";

const DRAWER_WIDTH = 260;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },

  drawerPaper: {
    width: DRAWER_WIDTH,
  },

  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    padding: "10px",
  },

  field: {
    height: 55,
  },
}));
