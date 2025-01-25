import axios, { AxiosError } from "axios";
import API_END_POINTS from "./apiEndpoints";

export const getLeadAndOpportunityStats = <TData,>(): (() => Promise<TData>) => {
    return async () => {
      try {
        const data = await axios.get(API_END_POINTS.getLeadAndOpportunityStats);
        return data.data;
      } catch (e) {
        const error = e as AxiosError;
        throw error.message;
      }
    };
  };
  