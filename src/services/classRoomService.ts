import http from "@/libs/httpSetting";

const getAllData = async () => {
  const res = await http.get(`/class-rooms`);
  return res.data.data;
};

const getOneData = async (id: Number) => {
  const res = await http.get(`/class-rooms/${id}`);
  return res.data.data;
};

const postData = async (data: any) => {
  return await http.post(`/class-rooms`, data);
};

const editData = async (data: any) => {
  return await http.put(`/class-rooms/${data.id}`, data);
};

const deleteData = async (id: any) => {
  return await http.delete(`/class-rooms/${id}`);
};

const ClassRoomService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
};

export default ClassRoomService;
