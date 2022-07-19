import format from "date-fns/fp/format";
import isThisMonth from "date-fns/isThisMonth";

export const getFormattedDate = (timestamp) =>
  format("yyyy-MM-dd")(new Date(timestamp));

export const getFormattedTime = (timestamp) =>
  format("HH:mm")(new Date(timestamp));

export const calculateCaloriesPerDay = (meals) => {
  const consumedCalories = new Map();
  meals.forEach(({ calories, timestamp }) => {
    const date = getFormattedDate(timestamp);
    const totalCalories = consumedCalories.get(date) || 0;
    consumedCalories.set(date, totalCalories + calories);
  });
  return consumedCalories;
};

export const calculateCurrentMonthExpenses = (meals) => {
  return meals.reduce(
    (sum, { price, timestamp }) =>
      isThisMonth(new Date(timestamp)) ? sum + price : sum,
    0,
  );
};
