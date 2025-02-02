import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  postCreateLead,
  postMeetingDetails,
  postNoteDetails,
  postTaskDetails,
  postUpdateLead,
  postUpdateNote,
  putMeetingDetails,
  putTaskDetails,
} from "./services";
import {
  LeadType,
  PostLeadType,
  PostMarkTaskCloseType,
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
    ["taskForm"],
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
    ["meetingForm"],
    postMeetingDetails<unknown, PostVisitDetailsType>(),
    options
  );
};

export const useUpdateMeetingDetails = <
  TError = AxiosError,
  TContext = unknown
>({
  options,
}: {
  options?: UseMutationOptions<unknown, TError, PostVisitDetailsType, TContext>;
}) => {
  return useMutation<unknown, TError, PostVisitDetailsType, TContext>(
    ["updateMeetingForm"],
    putMeetingDetails<unknown, PostVisitDetailsType>(),
    options
  );
};

export const useUpdateTaskDetails = <TError = AxiosError, TContext = unknown>({
  options,
}: {
  options?: UseMutationOptions<
    unknown,
    TError,
    PostMarkTaskCloseType,
    TContext
  >;
}) => {
  return useMutation<unknown, TError, PostMarkTaskCloseType, TContext>(
    ["updateTaskForm"],
    putTaskDetails<unknown, PostMarkTaskCloseType>(),
    options
  );
};

export const useCreateLead = <TError = AxiosError, TContext = unknown>({
  options,
}: {
  options?: UseMutationOptions<unknown, TError, PostLeadType, TContext>;
}) => {
  return useMutation<unknown, TError, PostLeadType, TContext>(
    ["postCreateLead"],
    postCreateLead<unknown, PostLeadType>(),
    options
  );
};

export const useUpdateNote = <TError = AxiosError, TContext = unknown>({
  options,
}: {
  options?: UseMutationOptions<unknown, TError, PostNoteType, TContext>;
}) => {
  return useMutation<unknown, TError, PostNoteType, TContext>(
    ["postUpdateNote"],
    postUpdateNote<unknown, PostNoteType>(),
    options
  );
};

export const useUpdateLead = <TError = AxiosError, TContext = unknown>({
  options,
}: {
  options?: UseMutationOptions<unknown, TError, LeadType, TContext>;
}) => {
  return useMutation<unknown, TError, LeadType, TContext>(
    ["postUpdateLead"],
    postUpdateLead<unknown, LeadType>(),
    options
  );
};
