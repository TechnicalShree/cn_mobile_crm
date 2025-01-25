import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  getLeadList,
  getMeetingList,
  getPendingTaskList,
  getLeadAnalysisStats,
  getLeadAndOpportunityStats,
} from "./services";
import { AxiosError } from "axios";
import {
  LeadListType,
  ToDoListType,
  MeetingListType,
  LeadAnalysisType,
  DashboardStatsInfoType,
} from "../types/types";

export const useFetchLeadAndOpportunityStats = <
  TData = DashboardStatsInfoType,
  TError = AxiosError
>(
  options?: UseQueryOptions<DashboardStatsInfoType, TError, TData>
) => {
  return useQuery<DashboardStatsInfoType, TError, TData>(
    ["getUserInfo"],
    getLeadAndOpportunityStats<DashboardStatsInfoType>(),
    options
  );
};

export const useFetchLeadAnalysisStats = <
  TData = LeadAnalysisType,
  TError = AxiosError
>(
  options?: UseQueryOptions<LeadAnalysisType, TError, TData>
) => {
  return useQuery<LeadAnalysisType, TError, TData>(
    ["getLeadAnalysisStats"],
    getLeadAnalysisStats<LeadAnalysisType>(),
    options
  );
};

export const useFetchPedingTaskList = <
  TData = ToDoListType,
  TError = AxiosError
>(
  options?: UseQueryOptions<ToDoListType, TError, TData>
) => {
  return useQuery<ToDoListType, TError, TData>(
    ["getPendingTaskList"],
    getPendingTaskList<ToDoListType>(),
    options
  );
};

export const useFetchMeetingList = <
  TData = MeetingListType,
  TError = AxiosError
>(
  options?: UseQueryOptions<MeetingListType, TError, TData>
) => {
  return useQuery<MeetingListType, TError, TData>(
    ["getMeetingList"],
    getMeetingList<MeetingListType>(),
    options
  );
};

// Lead list query

export const useFetchLeadList = <TData = LeadListType, TError = AxiosError>(
  filters: any[],
  or_filters?: any[],
  options?: UseQueryOptions<LeadListType, TError, TData>,
  limit_page_length?: number
) => {
  return useQuery<LeadListType, TError, TData>(
    ["getLeadList", filters, or_filters],
    getLeadList<LeadListType>({
      filters,
      or_filters,
      limit_page_length,
    }),
    options
  );
};
