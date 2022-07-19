import format from "date-fns/format";
import max from "date-fns/max";
import min from "date-fns/min";
import numeral from "numeral";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { useMemo } from "react";

import { calculateCaloriesPerDay, getFormattedDate } from "@/utils/index";
import { useMe } from "@/apiHooks/useUsers";
import { useMeals } from "@/apiHooks/useMeals";
import { DateRange } from "../DateRange";
import { useStyles } from "./styles";

export const MealFilters = ({ dateRange, setDateRange }) => {
  const classes = useStyles();
  const { data: me } = useMe({ fallbackData: {} });
  const { data } = useMeals({ fallbackData: [] });
  const timestamps = useMemo(
    () => data.map((meal) => new Date(meal.timestamp)),
    [data],
  );
  const maxDate = useMemo(
    () => (timestamps.length ? max(timestamps) : undefined),
    [timestamps],
  );
  const minDate = useMemo(
    () => (timestamps.length ? min(timestamps) : undefined),
    [timestamps],
  );
  const caloriesPerDay = useMemo(() => {
    const currentUserMeals = data.filter((meal) => meal.owner?._id === me._id);
    return calculateCaloriesPerDay(currentUserMeals);
  }, [data, me]);

  const dayContentRenderer = useMemo(() => {
    const DayContent = (day) => {
      const calories = caloriesPerDay.get(getFormattedDate(day));
      if (Number.isNaN(Number(calories)))
        return <span>{format(day, "d")}</span>;

      return (
        <Tooltip
          title={`Consumed ${numeral(calories).format("0.0a")} calories`}
          className={calories > me.caloriesPerDay ? "redDay" : ""}
        >
          <span>{format(day, "d")}</span>
        </Tooltip>
      );
    };
    return DayContent;
  }, [caloriesPerDay, me]);

  return (
    <>
      <DateRange
        value={dateRange}
        maxDate={maxDate}
        minDate={minDate}
        dayContentRenderer={dayContentRenderer}
        onReset={() => setDateRange({ key: "range" })}
        onChange={({ range }) => setDateRange(range)}
      />
      <Typography className={classes.note}>
        Red dot identifies when you exceeded the calorie limit.
      </Typography>
    </>
  );
};
