import Link from "next/link";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  text: {
    textAlign: "center",
    margin: "auto 0",
  },
});

const Page404 = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.text}>
      You are lost, want a ride <Link href="/">home</Link>?
    </Typography>
  );
};

export default Page404;
