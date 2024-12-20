import axios from "axios";

export const axiosErrorMessage = (error: unknown): string =>
  axios.isAxiosError(error)
    ? error.response?.data?.message || "An unexpected error occurred"
    : "An unknown error occurred";
