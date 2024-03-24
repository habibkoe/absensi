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

// User Room
const getUserRoomAllData = async () => {
  const res = await http.get(`/user-rooms`);
  return res.data;
};

const getUserRoomByUserData = async (params: any) => {
  const res = await http.get(`/user-rooms/user/${params}`);
  return res.data.data;
};

const getUserRoomOneData = async (classRoomId: any, userId: any) => {
  const res = await http.get(`/user-rooms/${classRoomId}/${userId}`);
  return res.data;
};

const postUserRoomData = async (data: any) => {
  return await http.post(`/user-rooms`, JSON.stringify(data));
};

const editUserRoomData = async (data: any) => {
  return await http.put(`/user-rooms/${data.classRoomId}/${data.userId}`, JSON.stringify(data));
};

const deleteUserRoomData = async (params: any) => {
  return await http.delete(`/user-rooms/${params.classRoomId}/${params.userId}`);
};

const UserService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
  getUserRoomAllData,
  getUserRoomOneData,
  postUserRoomData,
  editUserRoomData,
  deleteUserRoomData,
  getUserRoomByUserData,
};

export default UserService;
