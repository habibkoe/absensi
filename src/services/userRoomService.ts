import http from "@/libs/httpSetting";

export const getAllData = async () => {
  const res = await http.get(`/user-rooms`);
  return res.data;
};

export const getByUserData = async (params : any) => {
  const res = await http.get(`/user-rooms/user/${params}`);
  return res.data;
};

export const getOneData = async (classRoomId: any, userId: any) => {
  const res = await http.get(`/user-rooms/${classRoomId}/${userId}`);
  return res.data;
};

export const postData = async (data: any) => {
  return await http.post(`/user-rooms`, data);
};

export const editData = async (classRoomId: any, userId: any, data: any) => {
  return await http.put(`/user-rooms/${classRoomId}/${userId}`, data);
};

export const deleteData = async (classRoomId: any, userId: any) => {
  return await http.delete(`/user-rooms/${classRoomId}/${userId}`);
};
