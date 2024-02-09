import http from "@/libs/httpSetting";

export const getAllData = async () => {
  const res = await http.get(`/students`);
  return res.data.data;
};

const getAvalibleData = async () => {
  const res = await http.get(`/students/available`);
  return res.data.data;
};

const getOneData = async (id: Number) => {
  const res = await http.get(`/students/${id}`);
  return res.data.data;
};

const postData = async (data: any) => {
  return await http.post(`/students`, data);
};

const editData = async (data: any) => {
  return await http.put(`/students/${data.id}`, data);
};

const deleteData = async (id: any) => {
  return await http.delete(`/students/${id}`);
};

const StudentService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
  getAvalibleData
};

export default StudentService;