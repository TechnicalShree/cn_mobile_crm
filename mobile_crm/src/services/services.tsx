import { format } from "date-fns";
import API_END_POINTS from "./apiEndpoints";
import requestWrapper from "./callRequest";
import { PostLeadType, PostNoteType } from "../types/types";
import { de } from "date-fns/locale";

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
      url: API_END_POINTS.todoApi,
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
      url: API_END_POINTS.visitApi,
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
    filters: unknown[];
    or_filters?: unknown[];
    limit_page_length?: number;
  }): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.leadApi,
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
      url: `${API_END_POINTS.leadApi}/${lead_id}`,
      method: "GET",
    });

// Visit List API
export const getVisitList =
  <TData,>({ lead_id }: { lead_id: string }): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.visitApi,
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

export const getEmployeeDetails =
  <TData,>(): (() => Promise<TData>) =>
  () =>
    requestWrapper<TData>({
      url: API_END_POINTS.getEmployeeDetails,
      method: "GET",
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

// Mutation services
export const postNoteDetails = <TData, TVariables>(): ((
  formData: TVariables
) => Promise<TData>) => {
  return async (formData) => {
    return await requestWrapper<TData>({
      url: API_END_POINTS.crmNoteApi,
      method: "POST",
      data: JSON.stringify(formData),
    });
  };
};

export const postTaskDetails = <TData, TVariables>(): ((
  formData: TVariables
) => Promise<TData>) => {
  return async (formData) => {
    return await requestWrapper<TData>({
      url: API_END_POINTS.todoApi,
      method: "POST",
      data: JSON.stringify(formData),
    });
  };
};

export const postMeetingDetails = <TData, TVariables>(): ((
  formData: TVariables
) => Promise<TData>) => {
  return async (formData) => {
    return await requestWrapper<TData>({
      url: API_END_POINTS.visitApi,
      method: "POST",
      data: JSON.stringify(formData),
    });
  };
};

export const putMeetingDetails = <TData, TVariables>(): ((
  formData: TVariables
) => Promise<TData>) => {
  return async (formData) => {
    return await requestWrapper<TData>({
      url: API_END_POINTS.updateVisit,
      method: "POST",
      data: JSON.stringify({ visit: formData }),
    });
  };
};

interface TaskPayload {
  todo_id: string;
}

export const putTaskDetails = <TData, TVariables extends TaskPayload>(): ((
  payload: TVariables
) => Promise<TData>) => {
  return async (payload) => {
    return await requestWrapper<TData>({
      url: `${API_END_POINTS.updateTask}?todo_id=${payload.todo_id}`,
      method: "POST",
      // data: JSON.stringify(payload),
    });
  };
};

export const postCreateLead = <TData, TVariables>(): ((
  formData: TVariables
) => Promise<TData>) => {
  return async (formData) => {
    return await requestWrapper<TData>({
      url: API_END_POINTS.leadApi,
      method: "POST",
      data: JSON.stringify(formData),
    });
  };
};

export const postUpdateNote = <TData, TVariables extends PostNoteType>(): ((
  formData: TVariables
) => Promise<TData>) => {
  return async (formData) => {
    return await requestWrapper<TData>({
      url: `${API_END_POINTS.crmNoteApi}/${formData.name}`,
      method: "PUT",
      data: JSON.stringify(formData),
    });
  };
};

export const postUpdateLead = <TData, TVariables extends PostLeadType>(): ((
  formData: TVariables
) => Promise<TData>) => {
  return async (formData) => {
    const name = formData.name;
    delete formData.name || "";
    return await requestWrapper<TData>({
      url: `${API_END_POINTS.leadApi}/${name}`,
      method: "PUT",
      data: JSON.stringify(formData),
    });
  };
};
