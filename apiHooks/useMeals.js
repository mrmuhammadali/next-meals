import useSWR from "swr";

export const useMeals = (swrConfig) => {
  return useSWR("/api/meals", swrConfig);
};
