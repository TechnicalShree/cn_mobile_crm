import { format } from "date-fns";
import API_END_POINTS from "./apiEndpoints";
import requestWrapper from "./callRequest";

export const getLeadAndOpportunityStats =
  <TData,>(): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.getLeadAndOpportunityStats,
      method: "GET",
    });

export const getLeadAnalysisStats =
  <TData,>(): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.getLeadAnalysisStats,
      method: "GET",
    });

export const getPendingTaskList =
  <TData,>(): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.getPendingTaskList,
      method: "GET",
      params: {
        fields: JSON.stringify(["*"]),
        filters: JSON.stringify([
          ["status", "=", "Open"],
          ["reference_type", "=", "Lead"],
          ["reference_name", "is", "set"],
        ]),
        limit_page_length: 3,
      },
    });

export const getMeetingList =
  <TData,>(): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.getMeetingList,
      method: "GET",
      params: {
        fields: JSON.stringify(["*"]),
        filters: JSON.stringify([
          ["status", "in", ["Visit Scheduled", "Re-Visit Scheduled"]],
          ["date", "=", format(new Date(), "dd-MM-yyyy")],
          ["lead", "is", "set"],
        ]),
        limit_page_length: 3,
      },
    });

// Lead listing page API
export const getLeadList =
  <TData,>({
    filters,
    or_filters,
    limit_page_length = 10,
  }: {
    filters: any[];
    or_filters?: any[];
    limit_page_length?: number;
  }): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.getLeadList,
      method: "GET",
      params: {
        fields: JSON.stringify(["*"]),
        filters: JSON.stringify(filters),
        or_filters: JSON.stringify(or_filters),
        limit_page_length,
      },
    });

// Lead Detail Page API
export const getLeadDetails =
  <TData,>({ lead_id }: { lead_id: string }): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: `${API_END_POINTS.getLeadDetails}/${lead_id}`,
      method: "GET",
    });

// Visit List API
export const getVisitList =
  <TData,>({ lead_id }: { lead_id: string }): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.getVisitList,
      method: "GET",
      params: {
        fields: JSON.stringify(["*"]),
        filters: JSON.stringify([["lead", "=", lead_id]]),
      },
    });

// Task List API
export const getTaskList =
  <TData,>({ lead_id }: { lead_id: string }): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.todoApi,
      method: "GET",
      params: {
        fields: JSON.stringify(["*"]),
        filters: JSON.stringify([
          ["reference_type", "=", "Lead"],
          ["reference_name", "=", lead_id],
        ]),
      },
    });

// // Note List API
// export const getNoteList =
//   <TData,>({ lead_id }: { lead_id: string }): (() => Promise<TData>) =>
//   () =>
//     requestWrapper<TData>({
//       url: API_END_POINTS.todoApi,
//       method: "GET",
//       params: {
//         fields: JSON.stringify(["*"]),
//         filters: JSON.stringify([
//           ["reference_type", "=", "Lead"],
//           ["reference_name", "=", lead_id],
//         ]),
//       },
//     });
