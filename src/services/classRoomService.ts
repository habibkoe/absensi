import http from "@/libs/httpSetting";

export const getAllData = async () => {
  const res = await http.get(`/class-rooms`);
  return res.data;
};

export const getOneData = async (id: Number) => {
  const res = await http.get(`/class-rooms/${id}`);
  return res.data;
};

export const postData = async (data: any) => {
  return await http.post(`/class-rooms`, data);
};

export const editData = async (id: any, data: any) => {
  return await http.put(`/class-rooms/${id}`, data);
};

export const deleteData = async (id: any) => {
  return await http.delete(`/class-rooms/${id}`);
};

