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
  return await http.post(`/mapels`, JSON.stringify(data));
};

const editData = async (data: any) => {
  return await http.put(`/mapels/${data.id}`, JSON.stringify(data));
};

const deleteData = async (id: any) => {
  return await http.delete(`/mapels/${id}`);
};

// User Mapel
const getUserMapelAllData = async () => {
  const res = await http.get(`/user-mapels`);
  return res.data;
};

const getUserMapelByUserData = async (typeData : any, id: any) => {
  if(typeData && typeData == 1) {
    const res = await http.get(`/user-mapels/user/${id}`);
    return res.data;
  }else {
    getAllData();
  }
  
};

const getUserMapelOneData = async (mapelId: any, userId: any) => {
  const res = await http.get(`/user-mapels/${mapelId}/${userId}`);
  return res.data;
};

const postUserMapelData = async (data: any) => {
  return await http.post(`/user-mapels`, JSON.stringify(data));
};

const editUserMapelData = async (data: any) => {
  return await http.put(`/user-mapels/${data.mapelId}/${data.userId}`, JSON.stringify(data));
};

const deleteUserMapelData = async (params: any) => {
  return await http.delete(`/user-mapels/${params.mapelId}/${params.userId}`);
};

const MapelService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
  getUserMapelAllData,
  getUserMapelByUserData,
  getUserMapelOneData,
  postUserMapelData,
  editUserMapelData,
  deleteUserMapelData,
};

export default MapelService;