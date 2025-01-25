import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getLeadAndOpportunityStats } from "./services";
import { AxiosError } from "axios";
import { DashboardStatsInfoType } from "../types/types";

export const fetchLeadAndOpportunityStats = <
  TData = DashboardStatsInfoType,
  TError = AxiosError
>(
  options?: UseQueryOptions<DashboardStatsInfoType, TError, TData>
) => {
  return useQuery<DashboardStatsInfoType, TError, TData>(
      ["getUserInfo"],
      getLeadAndOpportunityStats<DashboardStatsInfoType>(),
      options,
  );
};
