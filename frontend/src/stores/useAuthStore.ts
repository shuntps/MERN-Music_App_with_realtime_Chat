import { create } from "zustand";
import { AxiosError } from "axios";

import { AuthStore } from "@/types";

import { axiosErrorMessage } from "@/utils/errorMessage";

import { axiosInstance } from "@/lib/axios";

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.admin });
    } catch (error: AxiosError | unknown) {
      set({ isAdmin: false, error: axiosErrorMessage(error) });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
