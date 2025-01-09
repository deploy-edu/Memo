import { Dayjs } from "dayjs";
import { create } from "zustand";

export type Memo = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
};

export type MemoStoreState = {
  lastId: number;
  data: Memo[];
  isRefreshing: boolean;
  filterDay?: Dayjs;
};

export type MemoStoreAction = {
  setFilterDay: (day: Dayjs | undefined) => void;
  setMemos: (data: Memo[], lastId: number) => void;
  addMemo: (memo: Memo) => void;
  updateMemo: (updatedMemo: Memo) => void;
  deleteMemo: (id: number) => void;
  setIsRefreshing: (isRefreshing: boolean) => void;
};

export const useMemoStore = create<MemoStoreState & MemoStoreAction>((set) => ({
  isRefreshing: false,
  filterDay: undefined,
  data: [],
  lastId: 0,
  setFilterDay: (day) => {
    set({ filterDay: day });
  },
  setMemos: (data, lastId) => {
    set({ data, lastId });
  },
  addMemo: (memo) => {
    set((state) => ({
      data: [memo, ...state.data],
    }));
  },
  updateMemo: (updatedMemo) => {
    set((state) => ({
      data: state.data.map((item) =>
        item.id === updatedMemo.id ? updatedMemo : item
      ),
    }));
  },
  deleteMemo: (id) => {
    set((state) => ({
      data: state.data.filter((item) => item.id !== id),
    }));
  },
  setIsRefreshing: (isRefreshing) => {
    set({ isRefreshing });
  },
}));
