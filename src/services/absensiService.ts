import http from "@/libs/httpSetting";

export const getAllData = async () => {
  const res = await http.get(`/absensi`);
  return res.data;
};

export const getOneData = async (id: Number) => {
  const res = await http.get(`/absensi/${id}`);
  return res.data;
};

export const postData = async (data: any) => {
  return await http.post(`/absensi`, JSON.stringify(data));
};

export const editData = async (id: any, data: any) => {
  return await http.put(`/absensi/${id}`, JSON.stringify(data));
};

export const deleteData = async (id: any) => {
  return await http.delete(`/absensi/${id}`);
};

const AbsensiService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
};

export default AbsensiService;