import http from "@/libs/httpSetting";

export const getAllData = async () => {
  const res = await http.get(`/user-mapels`);
  return res.data;
};

export const getByUserData = async (params : any) => {
  const res = await http.get(`/user-mapels/user/${params}`);
  return res.data;
};

export const getOneData = async (classRoomId: any, userId: any) => {
  const res = await http.get(`/user-mapels/${classRoomId}/${userId}`);
  return res.data;
};

export const postData = async (data: any) => {
  return await http.post(`/user-mapels`, data);
};

export const editData = async (classRoomId: any, userId: any, data: any) => {
  return await http.put(`/user-mapels/${classRoomId}/${userId}`, data);
};

export const deleteData = async (classRoomId: any, userId: any) => {
  return await http.delete(`/user-mapels/${classRoomId}/${userId}`);
};
