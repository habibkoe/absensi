import http from "@/libs/httpSetting";

export const getAllData = async () => {
  const res = await http.get(`/users`);
  return res.data;
};

export const getOneData = async (id: Number) => {
  const res = await http.get(`/users/${id}`);
  return res.data;
};

export const postData = async (data: any) => {
  return await http.post(`/users`, data);
};

export const editData = async (id: any, data: any) => {
  return await http.put(`/users/${id}`, data);
};

export const deleteData = async (id: any) => {
  return await http.delete(`/users/${id}`);
};
