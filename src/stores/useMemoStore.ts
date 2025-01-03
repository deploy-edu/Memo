import { create } from "zustand";
import { supabase } from "../libs/supabase";

export type Memo = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
};

export type MemoStoreState = {
  lastId: number;
  data: Memo[];
  isLoading: boolean;
};

export type MemoStoreAction = {
  fetch: () => Promise<void>;
  fetchMore: () => Promise<void>;
  update: ({
    id,
    title,
    content,
  }: {
    id: number;
    title: string;
    content: string;
  }) => Promise<void>;
  delete: (id: number) => Promise<void>;
};

export const useMemoStore = create<MemoStoreState & MemoStoreAction>(
  (set, get) => ({
    isLoading: false,
    data: [],
    lastId: 0,
    fetch: async () => {
      if (get().isLoading) {
        return;
      }

      set({ isLoading: true });

      const { data, error } = await supabase
        .from("Memo")
        .select("id, title, content, created_at")
        .order("id", { ascending: false })
        .limit(10);

      if (error) {
        console.error(error);
        return;
      }

      if (data.length === 0) {
        set({ data: [], isLoading: false, lastId: 0 });
        return;
      }

      set({ data, isLoading: false, lastId: data[data.length - 1].id });
    },
    fetchMore: async () => {
      if (get().isLoading) {
        return;
      }

      set({ isLoading: true });
      const { data, error } = await supabase
        .from("Memo")
        .select("id, title, content, created_at")
        .order("id", { ascending: false })
        .lt("id", get().lastId)
        .limit(10);
      if (error) {
        console.error(error);
        return;
      }

      if (data.length === 0) {
        set({ isLoading: false });
        return;
      }

      set((state) => ({
        data: [...state.data, ...data],
        isLoading: false,
        lastId: data[data.length - 1].id,
      }));
    },
    update: async ({ id, title, content }) => {
      const { error } = await supabase.from("Memo").upsert({
        id,
        title,
        content,
      });

      if (error) {
        console.error(error);
        return;
      }

      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, title, content } : item
        ),
      }));
    },
    delete: async (id: number) => {
      const { error } = await supabase.from("Memo").delete().eq("id", id);
      if (error) {
        console.error(error);
        return;
      }

      set((state) => ({
        data: state.data.filter((item) => item.id !== id),
      }));
    },
  })
);