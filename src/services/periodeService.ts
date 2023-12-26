import http from "@/libs/httpSetting";

export const getAllData = async () => {
  const res = await http.get(`/periodes`);
  return res.data;
};

export const getOneData = async (id: Number) => {
  const res = await http.get(`/periodes/${id}`);
  return res.data;
};

export const postData = async (data: any) => {
  return await http.post(`/periodes`, data);
};

export const editData = async (id: any, data: any) => {
  return await http.put(`/periodes/${id}`, data);
};

export const deleteData = async (id: any) => {
  return await http.delete(`/periodes/${id}`);
};
