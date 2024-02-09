import http from "@/libs/httpSetting";

const getAllData = async () => {
  const res = await http.get(`/student-rooms`);
  return res.data.data;
};

// gunakan 3 parameter,
// [0] = classRoomId
// [1] = periodeId
// [2] = studentId

const getOneData = async (classRoomId: any, studentId: any) => {
  const res = await http.get(`/student-rooms/${classRoomId}/0/${studentId}`);
  return res.data.data;
};

const getDataByClassAndPeriode = async (classRoomId: any, periodeId: any) => {
  const res = await http.get(`/student-rooms/${classRoomId}/${periodeId}/0`);
  return res.data;
};

const postData = async (data: any) => {
  return await http.post(`/student-rooms`, data);
};

const editData = async (data: any) => {
  return await http.put(`/student-rooms/${data.classRoomId}/${data.studentId}`, data);
};

const deleteData = async (params: any) => {
  return await http.delete(`/student-rooms/${params.classRoomId}/${params.studentId}`);
};

const StudentRoomService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
  getDataByClassAndPeriode,
};

export default StudentRoomService;
