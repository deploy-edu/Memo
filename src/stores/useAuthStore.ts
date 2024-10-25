import { create } from "zustand";

export type AuthStoreState = {
  isLoggedIn: boolean;
};

export type AuthStoreAction = {
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreState & AuthStoreAction>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
