import Button from "@material-ui/core/Button";
import { DateRange as ReactDateRange } from "react-date-range";
import Typography from "@material-ui/core/Typography";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useStyles } from "./styles";

export const DateRange = (props) => {
  const { value, minDate, maxDate, dayContentRenderer, onChange, onReset } =
    props;
  const classes = useStyles();

  return (
    <>
      <div className={classes.title}>
        <Typography variant="subtitle2">Filters:</Typography>
        <Button size="small" color="secondary" onClick={onReset}>
          Clear
        </Button>
      </div>
      <ReactDateRange
        className={classes.dateRange}
        onChange={onChange}
        showSelectionPreview={true}
        ranges={[value]}
        direction="horizontal"
        minDate={minDate}
        maxDate={maxDate}
        dayContentRenderer={dayContentRenderer}
      />
    </>
  );
};
