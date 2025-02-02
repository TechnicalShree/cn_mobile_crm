import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  // getNoteList,
  getLeadList,
  getVisitList,
  getLeadDetails,
  getMeetingList,
  getPendingTaskList,
  getLeadAnalysisStats,
  getLeadAndOpportunityStats,
  getTaskList,
  getEmployeeDetails,
  getReportViewList,
} from "./services";
import { AxiosError } from "axios";
import {
  LeadListType,
  ToDoListType,
  VisitListType,
  MeetingListType,
  LeadDetailsType,
  LeadAnalysisType,
  DashboardStatsInfoType,
  EmployeeDetailResponseType,
} from "../types/types";

export const useFetchLeadAndOpportunityStats = <
  TData = DashboardStatsInfoType,
  TError = AxiosError
>({
  options,
}: {
  options?: UseQueryOptions<DashboardStatsInfoType, TError, TData>;
}) =>
  useQuery<DashboardStatsInfoType, TError, TData>(
    ["getUserInfo"],
    getLeadAndOpportunityStats<DashboardStatsInfoType>(),
    options
  );

export const useFetchLeadAnalysisStats = <
  TData = LeadAnalysisType,
  TError = AxiosError
>({
  options,
}: {
  options?: UseQueryOptions<LeadAnalysisType, TError, TData>;
}) =>
  useQuery<LeadAnalysisType, TError, TData>(
    ["getLeadAnalysisStats"],
    getLeadAnalysisStats<LeadAnalysisType>(),
    options
  );

export const useFetchPedingTaskList = <
  TData = ToDoListType,
  TError = AxiosError
>({
  options,
}: {
  options?: UseQueryOptions<ToDoListType, TError, TData>;
}) =>
  useQuery<ToDoListType, TError, TData>(
    ["getPendingTaskList"],
    getPendingTaskList<ToDoListType>(),
    options
  );

export const useFetchMeetingList = <
  TData = MeetingListType,
  TError = AxiosError
>({
  options,
}: {
  options?: UseQueryOptions<MeetingListType, TError, TData>;
}) =>
  useQuery<MeetingListType, TError, TData>(
    ["getMeetingList"],
    getMeetingList<MeetingListType>(),
    options
  );

// Lead details query
export const useFetchLeadDetails = <
  TData = LeadDetailsType,
  TError = AxiosError
>({
  lead_id,
  options,
}: {
  lead_id: string;
  options?: UseQueryOptions<LeadDetailsType, TError, TData>;
}) =>
  useQuery<LeadDetailsType, TError, TData>(
    ["getLeadDetails", lead_id],
    getLeadDetails<LeadDetailsType>({ lead_id }),
    options
  );

export const useFetchTaskList = <TData = ToDoListType, TError = AxiosError>({
  lead_id,
  options,
}: {
  lead_id: string;
  options?: UseQueryOptions<ToDoListType, TError, TData>;
}) =>
  useQuery<ToDoListType, TError, TData>(
    ["getTaskList", lead_id],
    getTaskList<ToDoListType>({ lead_id }),
    options
  );

export const useFetchEmployeeDetails = <
  TData = EmployeeDetailResponseType,
  TError = AxiosError
>({
  options,
}: {
  options?: UseQueryOptions<EmployeeDetailResponseType, TError, TData>;
}) =>
  useQuery<EmployeeDetailResponseType, TError, TData>(
    ["getEmployeeDetails"],
    getEmployeeDetails<EmployeeDetailResponseType>(),
    options
  );

{
  /* export const useFetchNoteList = <TData = VisitListType, TError = AxiosError>({
  lead_id,
  options,
}: {
  lead_id: string;
  options?: UseQueryOptions<VisitListType, TError, TData>;
}) =>
  useQuery<VisitListType, TError, TData>(
    ["getNoteList", lead_id],
    getNoteList<VisitListType>({ lead_id }),
    options
  ); */
}

export const useFetchVisitList = <TData = VisitListType, TError = AxiosError>({
  lead_id,
  options,
}: {
  lead_id: string;
  options?: UseQueryOptions<VisitListType, TError, TData>;
}) =>
  useQuery<VisitListType, TError, TData>(
    ["getVisitList", lead_id],
    getVisitList<VisitListType>({ lead_id }),
    options
  );

// Lead list query
export const useFetchLeadList = <TData = LeadListType, TError = AxiosError>({
  filters,
  limit_page_length,
  options,
  or_filters,
}: {
  filters: unknown[];
  or_filters?: unknown[];
  options?: UseQueryOptions<LeadListType, TError, TData>;
  limit_page_length?: number;
}) =>
  useQuery<LeadListType, TError, TData>(
    ["getLeadList", filters, or_filters],
    getLeadList<LeadListType>({
      filters,
      or_filters,
      limit_page_length,
    }),
    options
  );

// Lead list query
export const useFetchReportViewList = <TData, TError = AxiosError>({
  doctype,
  filters,
  limit_page_length,
  options,
  or_filters,
}: {
  doctype: string;
  filters: unknown[];
  or_filters?: unknown[];
  options?: UseQueryOptions<TData, TError, TData>;
  limit_page_length?: number;
}) =>
  useQuery<TData, TError, TData>(
    ["getReportViewList", filters, or_filters],
    getReportViewList<TData>({
      doctype,
      filters,
      or_filters,
      limit_page_length,
    }),
    options
  );
