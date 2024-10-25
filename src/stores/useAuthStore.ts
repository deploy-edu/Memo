import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

export type AuthStoreState = {
  isLoggedIn: boolean;
  session?: Session;
};

export type AuthStoreAction = {
  login: (session: Session) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreState & AuthStoreAction>((set) => ({
  isLoggedIn: false,
  login: (session) => set({ session, isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, session: undefined }),
}));
