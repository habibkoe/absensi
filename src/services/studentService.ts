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
  return await http.post(`/students`, JSON.stringify(data));
};

const editData = async (data: any) => {
  return await http.put(`/students/${data.id}`, JSON.stringify(data));
};

const deleteData = async (id: any) => {
  return await http.delete(`/students/${id}`);
};

// Student Room
const getStudentRoomAllData = async () => {
  const res = await http.get(`/student-rooms`);
  return res.data.data;
};

// gunakan 3 parameter,
// [0] = classRoomId
// [1] = periodeId
// [2] = studentId

const getStudentRoomOneData = async (classRoomId: any, studentId: any) => {
  const res = await http.get(`/student-rooms/${classRoomId}/0/${studentId}`);
  return res.data.data;
};

const getDataByClassAndPeriode = async (classRoomId: any, periodeId: any) => {
  const res = await http.get(`/student-rooms/${classRoomId}/${periodeId}/0`);
  return res.data.data;
};

const postStudentRoomData = async (data: any) => {
  return await http.post(`/student-rooms`, data);
};

const editStudentRoomData = async (data: any) => {
  return await http.put(
    `/student-rooms/${data.classRoomId}/${data.studentId}`,
    data
  );
};

const deleteStudentRoomData = async (params: any) => {
  return await http.delete(
    `/student-rooms/${params.classRoomId}/${params.studentId}`
  );
};

const StudentService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
  getAvalibleData,
  getStudentRoomAllData,
  getStudentRoomOneData,
  getDataByClassAndPeriode,
  postStudentRoomData,
  editStudentRoomData,
  deleteStudentRoomData,
};

export default StudentService;
