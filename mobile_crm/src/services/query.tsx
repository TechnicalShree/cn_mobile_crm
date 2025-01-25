import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getLeadAndOpportunityStats, getMeetingList, getPendingTaskList,  } from "./services";
import { AxiosError } from "axios";
import { DashboardStatsInfoType, MeetingListType, ToDoListType } from "../types/types";

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
