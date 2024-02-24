import http from "@/libs/httpSetting";

const getAllData = async () => {
  const res = await http.get(`/users`);
  return res.data.data;
};

const getOneData = async (id: Number) => {
  const res = await http.get(`/users/${id}`);
  return res.data.data;
};

const postData = async (data: any) => {
  return await http.post(`/users`, JSON.stringify(data));
};

const editData = async (data: any) => {
  return await http.put(`/users/${data.id}`, JSON.stringify(data));
};

const deleteData = async (id: any) => {
  return await http.delete(`/users/${id}`);
};

const UserService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
};

export default UserService;
