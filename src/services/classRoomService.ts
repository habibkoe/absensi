import http from "@/libs/httpSetting";

export const getAll = async () => {
  const res = await http.get(`/class-rooms`);
  return res.data;
};

export const getOne = async (id: Number) => {
  const res = await http.get(`/class-rooms/${id}`);
  return res.data;
};
