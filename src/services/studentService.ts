import http from "@/libs/httpSetting";

export const getAll = async () => {
  const res = await http.get(`/students`);
  return res.data;
};

export const getOne = async (id: Number) => {
  const res = await http.get(`/students/${id}`);
  return res.data;
};
