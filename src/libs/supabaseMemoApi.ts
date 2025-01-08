import { Dayjs } from "dayjs";
import { supabase } from "../libs/supabase";

export const fetchMemos = async (filterDay?: Dayjs, lastId?: number) => {
  const query = supabase
    .from("Memo")
    .select("id, title, content, created_at")
    .order("id", { ascending: false })
    .limit(10);

  if (lastId !== undefined) {
    query.lt("id", lastId);
  }

  if (filterDay) {
    const startOfDay = filterDay.startOf("day");
    const endOfDay = filterDay.endOf("day");

    query.gte("created_at", startOfDay.toISOString());
    query.lte("created_at", endOfDay.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const addMemo = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const { data, error } = await supabase
    .from("Memo")
    .insert([{ title, content }])
    .select("id, title, content, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateMemo = async ({
  id,
  title,
  content,
}: {
  id: number;
  title: string;
  content: string;
}) => {
  const { error, data } = await supabase
    .from("Memo")
    .upsert({ id, title, content })
    .select("id, title, content, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteMemo = async (id: number) => {
  const { error } = await supabase.from("Memo").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
