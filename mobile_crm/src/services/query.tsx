import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getLeadAndOpportunityStats } from "./services";
import { AxiosError } from "axios";
import { DashboardStatsInfoType } from "../types/types";

export const useGetAllUserInfo = <
  TData = DashboardStatsInfoType,
  TError = AxiosError
>(
  options?: UseQueryOptions<DashboardStatsInfoType, TError, TData> // Add options parameter
) => {
  return useQuery<DashboardStatsInfoType, TError, TData>({
    queryKey: ["getUserInfo"],
    queryFn: () => getLeadAndOpportunityStats<DashboardStatsInfoType>(), // Ensure it's wrapped in a function
    ...options, // Spread the options here to merge them with the default configuration
  });
};
