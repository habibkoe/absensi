import http from "@/libs/httpSetting";
import { Periode } from "@prisma/client";

const getAllData = async () => {
  const res = await http.get<any>(`/periodes`);
  return res.data.data;
};

const getOneData = async (id: Number) => {
  const res = await http.get<any>(`/periodes/${id}`);
  return res.data.data;
};

const postData = async (data: any) => {
  return await http.post<any>(`/periodes`, JSON.stringify(data));
};

const editData = async (data: any) => {
  return await http.put<any>(`/periodes/${data.id}`, JSON.stringify(data));
};

const deleteData = async (id: Number) => {
  return await http.delete<any>(`/periodes/${id}`);
};

const PeriodeService = {
  getAllData,
  getOneData,
  postData,
  editData,
  deleteData,
};

export default PeriodeService;
