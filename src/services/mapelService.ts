import http from "@/libs/httpSetting";

const getAllData = async () => {
  const res = await http.get(`/mapels`);
  return res.data.data;
};

const getOneData = async (id: Number) => {
  const res = await http.get(`/mapels/${id}`);
  return res.data.data;
};

const postData = async (data: any) => {
  return await http.post(`/mapels`, data);
};

const editData = async (data: any) => {
  return await http.put(`/mapels/${data.id}`, data);
};

const deleteData = async (id: any) => {
  return await http.delete(`/mapels/${id}`);
};

const MapelService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
};

export default MapelService;