import { create } from "zustand";
import { getItem } from "./storage";

interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;

  login: () => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),

  checkAuth: async () => {
    const authUserData = getItem("user");
    const authTokenData = getItem("KTMVTour_token");

    if (authUserData && authTokenData) {
      set({ isAuthenticated: true });
      return true;
    }

    set({ isAuthenticated: false });
    return false;
  },
}));
