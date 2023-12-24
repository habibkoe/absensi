import http from "@/libs/httpSetting";

export const getAll = async () => {
  const res = await http.get(`/users`);
  return res.data;
};

export const getOne = async (id: Number) => {
  const res = await http.get(`/users/${id}`);
  return res.data;
};
