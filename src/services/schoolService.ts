import http from "@/libs/httpSetting";

export const getAllData = async () => {
  const res = await http.get(`/school`);
  return res.data;
};

export const getOneData = async (id: Number) => {
  const res = await http.get(`/school/${id}`);
  return res.data;
};

export const postData = async (data: any) => {
  return await http.post(`/school`, JSON.stringify(data));
};

export const editData = async (data: any) => {
  return await http.put(`/school/${data.id}`, JSON.stringify(data));
};

export const deleteData = async (id: any) => {
  return await http.delete(`/school/${id}`);
};

const SchoolService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
};

export default SchoolService;