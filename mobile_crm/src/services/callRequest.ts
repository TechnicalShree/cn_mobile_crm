import axios, { AxiosError, AxiosRequestHeaders } from "axios";

declare global {
  interface Window {
    csrf_token?: string;
    getLocationFromApp: () => void;
    onReceiveLocation: (value: { latitude: number; longitude: number }) => void;
  }
}

type RequestWrapperType = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
  params?: unknown;
  headers?: AxiosRequestHeaders;
};

const requestWrapper = async <TResponse>({
  url,
  method = "GET",
  headers,
  ...rest
}: RequestWrapperType): Promise<TResponse> => {
  try {
    const data = await axios({
      method: method,
      url: url,
      ...rest,
      headers: {
        ...headers,
        "x-frappe-csrf-token": window?.csrf_token ?? "",
      },
    });
    return data.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error.message || "Something went wrong";
  }
};

export default requestWrapper;
