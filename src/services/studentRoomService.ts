import http from "@/libs/httpSetting";

export const getAllData = async () => {
  const res = await http.get(`/student-rooms`);
  return res.data;
};

// gunakan 3 parameter, 
// [0] = classRoomId
// [1] = periodeId
// [2] = studentId

export const getOneData = async (classRoomId: any, studentId: any) => {
  const res = await http.get(`/student-rooms/${classRoomId}/0/${studentId}`);
  return res.data;
};

export const getDataByClassAndPeriode = async (classRoomId: any, periodeId: any) => {
  const res = await http.get(`/student-rooms/${classRoomId}/${periodeId}/0`);
  return res.data;
};

export const postData = async (data: any) => {
  return await http.post(`/student-rooms`, data);
};

export const editData = async (classRoomId: any, studentId: any, data: any) => {
  return await http.put(`/student-rooms/${classRoomId}/${studentId}`, data);
};

export const deleteData = async (classRoomId: any, studentId: any) => {
  return await http.delete(`/student-rooms/${classRoomId}/${studentId}`);
};
