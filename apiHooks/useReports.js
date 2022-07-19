import useSWR from "swr";

export const useBiweeklyCount = (swrConfig) => {
  return useSWR("/api/report/biweekly", swrConfig);
};

export const useCaloriesAvg = (swrConfig) => {
  return useSWR("/api/report/calories-avg", swrConfig);
};
