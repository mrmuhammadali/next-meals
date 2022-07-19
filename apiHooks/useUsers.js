import nookies from "nookies";
import useSWR from "swr";

export const useMe = (swrConfig) => {
  const cookie = nookies.get("token");
  return useSWR(cookie.token ? "/api/users/me" : null, swrConfig);
};

export const useUsers = (swrConfig) => {
  return useSWR("/api/users", swrConfig);
};
