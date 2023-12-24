import http from "@/libs/httpSetting";

export const getAll = async () => {
  const res = await http.get(`/mapels`);
  return res.data;
};

export const getOne = async (id: Number) => {
  const res = await http.get(`/mapels/${id}`);
  return res.data;
};

export const post = async (data: any) => {
  return await http.post(`/mapels`, data);
};
