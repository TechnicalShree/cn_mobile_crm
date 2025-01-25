import { format } from "date-fns";
import API_END_POINTS from "./apiEndpoints";
import requestWrapper from "./callRequest";

export const getLeadAndOpportunityStats = <TData,>(): (() => Promise<TData>) => {
    return async () => await requestWrapper<TData>({
          url: API_END_POINTS.getLeadAndOpportunityStats,
          method: "GET",
        });
  };

export const getLeadAnalysisStats = <TData,>(): (() => Promise<TData>) => {
    return async () => await requestWrapper<TData>({
          url: API_END_POINTS.getLeadAnalysisStats,
          method: "GET",
        });
  };
  
export const getPendingTaskList = <TData,>(): (() => Promise<TData>) => {
  return async () => await requestWrapper<TData>({
      url: API_END_POINTS.getPendingTaskList,
      method: "GET",
      params: {
        fields: JSON.stringify(["*"]),
        filters: JSON.stringify([["status","=","Open"],["reference_type","=","Lead"],["reference_name","is","set"]]),
        limit_page_length: 3,
      }
    })
};


export const getMeetingList = <TData,>(): (() => Promise<TData>) => {
  return async () => await requestWrapper<TData>({
      url: API_END_POINTS.getMeetingList,
      method: "GET",
      params: {
        fields: JSON.stringify(["*"]),
        filters: JSON.stringify([["status","in",["Visit Scheduled","Re-Visit Scheduled"]],["date","=",format(new Date(), "dd-MM-yyyy")],["lead","is","set"]]),
        limit_page_length: 3,
      }
    })
};
