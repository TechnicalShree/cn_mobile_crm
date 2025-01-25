import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getLeadAndOpportunityStats, getMeetingList, getPendingTaskList, getLeadAnalysisStats } from "./services";
import { AxiosError } from "axios";
import { DashboardStatsInfoType, LeadAnalysisTypes, MeetingListType, ToDoListType } from "../types/types";

export const useFetchLeadAndOpportunityStats = <
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

export const useFetchLeadAnalysisStats = <
  TData = LeadAnalysisTypes,
  TError = AxiosError,
>(
  options?: UseQueryOptions<LeadAnalysisTypes, TError, TData>
) => {
  return useQuery<LeadAnalysisTypes, TError, TData>(
      ["getLeadAnalysisStats"],
      getLeadAnalysisStats<LeadAnalysisTypes>(),
      options,
  );
};


export const useFetchPedingTaskList = <
  TData = ToDoListType,
  TError = AxiosError,
>(
  options?: UseQueryOptions<ToDoListType, TError, TData>
) => {
  return useQuery<ToDoListType, TError, TData>(
      ["getPendingTaskList"],
      getPendingTaskList<ToDoListType>(),
      options,
  );
};


export const useFetchMeetingList = <
  TData = MeetingListType,
  TError = AxiosError,
>(
  options?: UseQueryOptions<MeetingListType, TError, TData>
) => {
  return useQuery<MeetingListType, TError, TData>(
      ["getMeetingList"],
      getMeetingList<MeetingListType>(),
      options,
  );
};
