import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  postMeetingDetails,
  postNoteDetails,
  postTaskDetails,
} from "./services";
import {
  PostNoteType,
  PostToDoType,
  PostVisitDetailsType,
} from "../types/types";

export const useSubmitNoteDetails = <TError = AxiosError, TContext = unknown>({
  options,
}: {
  options?: UseMutationOptions<unknown, TError, PostNoteType, TContext>;
}) => {
  return useMutation<unknown, TError, PostNoteType, TContext>(
    ["noteForm"],
    postNoteDetails<unknown, PostNoteType>(),
    options
  );
};

export const useSubmitTaskDetails = <TError = AxiosError, TContext = unknown>({
  options,
}: {
  options?: UseMutationOptions<unknown, TError, PostToDoType, TContext>;
}) => {
  return useMutation<unknown, TError, PostToDoType, TContext>(
    ["noteForm"],
    postTaskDetails<unknown, PostToDoType>(),
    options
  );
};

export const useSubmitMeetingDetails = <
  TError = AxiosError,
  TContext = unknown
>({
  options,
}: {
  options?: UseMutationOptions<unknown, TError, PostVisitDetailsType, TContext>;
}) => {
  return useMutation<unknown, TError, PostVisitDetailsType, TContext>(
    ["noteForm"],
    postMeetingDetails<unknown, PostVisitDetailsType>(),
    options
  );
};
