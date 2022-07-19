import { useCallback, useMemo, useState } from "react";
import addDuration from "date-fns/add";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import isValidDate from "date-fns/isValid";
import isWithinInterval from "date-fns/isWithinInterval";
import numeral from "numeral";
import Paper from "@material-ui/core/Paper";

import { calculateCurrentMonthExpenses } from "@/utils/index";
import { MealFilters } from "./MealFilter";
import { MealItemForm } from "../MealItemForm";
import { Slate } from "../Slate";
import { Table } from "../Table";
import { useFeedback } from "../Feedback";
import { useMe } from "@/apiHooks/useUsers";
import { useMeals } from "@/apiHooks/useMeals";
import { getColumns } from "./columns";
import { useStyles } from "./styles";

export const PageMeals = ({}) => {
  const { data: me } = useMe({ fallbackData: {} });
  const { data, error, mutate } = useMeals();
  const { showConfirmation, handleClose } = useFeedback();
  const classes = useStyles();
  const [selectedMeal, setMeal] = useState(null);
  const [dateRange, setDateRange] = useState({ key: "range" });
  const spentThisMonth = useMemo(
    () =>
      numeral(
        data?.length
          ? calculateCurrentMonthExpenses(
              data.filter((meal) => meal.owner._id === me._id),
            )
          : 0,
      ),
    [data, me],
  );
  const filteredMeals = useMemo(() => {
    if (!isValidDate(dateRange.startDate) || !isValidDate(dateRange.endDate)) {
      return data;
    }
    return data?.filter(({ timestamp }) => {
      const date = new Date(timestamp);
      const endDate = addDuration(dateRange.endDate, {
        hours: 23,
        minutes: 59,
      });

      return isWithinInterval(date, {
        start: dateRange.startDate,
        end: endDate,
      });
    });
  }, [data, dateRange]);

  const onDeleteClick = useCallback(
    (meal) => {
      showConfirmation({
        message: `Are you sure you want to delete ${meal.name}?`,
        handleConfirm: () =>
          axios
            .delete(`/api/meals/${meal._id}`)
            .then(() =>
              mutate(
                data.filter((m) => meal._id !== m._id),
                false,
              ),
            )
            .then(handleClose)
            .catch(() => null),
      });
    },
    [data, handleClose, mutate, showConfirmation],
  );

  const onAddMealClick = () => {
    setMeal({ name: "", calories: "", price: "", owner: {} });
  };

  const columns = useMemo(() => {
    if (me.role === "admin") return getColumns({ onDeleteClick });
    return getColumns({ onDeleteClick }).filter(
      ({ accessor }) => accessor !== "owner.email",
    );
  }, [me.role, onDeleteClick]);

  return (
    <main className={classes.root}>
      <Paper
        className={[
          classes.meals,
          filteredMeals?.length ? "" : classes.flex,
        ].join(" ")}
      >
        <Slate data={filteredMeals} error={error}>
          <Table
            columns={columns}
            data={filteredMeals || []}
            onRowClick={setMeal}
          />
        </Slate>
      </Paper>
      <Paper className={classes.filters}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          onClick={onAddMealClick}
        >
          Add Meal
        </Button>
        <Divider className={classes.divider} />
        <MealFilters dateRange={dateRange} setDateRange={setDateRange} />
      </Paper>
      {spentThisMonth.value() > 1000 && (
        <Alert severity="warning">
          You have spent {spentThisMonth.format("($0.00a)")} this month.
        </Alert>
      )}
      <MealItemForm meal={selectedMeal} onClose={() => setMeal(null)} />
    </main>
  );
};
