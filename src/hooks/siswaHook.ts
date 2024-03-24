import MapelService from "@/services/mapelService";
import StudentService from "@/services/studentService";
import { Students } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface updateParams {
  data: any;
  id: Number;
}

const useAllPosts = () => {
  return useQuery<Students[], Error>({
    queryKey: ["siswa"],
    queryFn: () => StudentService.getAllData(),
  });
};

const useAvailablePosts = () => {
  return useQuery<Students[], Error>({
    queryKey: ["siswa"],
    queryFn: () => StudentService.getAvalibleData(),
  });
};

const usePostById = (id: Number) => {
  return useQuery<Students, Error>({
    queryKey: ["siswa", id],
    queryFn: () => StudentService.getOneData(id),
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siswa"] });
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.editData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siswa"] });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siswa"] });
    },
  });
};

// Siswa Kelas
const useStudentRoomAllPosts = () => {
  return useQuery<any[], Error>({
    queryKey: ["siswa_kelas"],
    queryFn: () => StudentService.getStudentRoomAllData(),
  });
};

const useStudentRoomPostById = (studentId: number, classRoomId: number) => {
  let uniqueId = studentId + classRoomId;
  return useQuery<any, Error>({
    queryKey: ["siswa_kelas_", uniqueId],
    queryFn: () => StudentService.getStudentRoomOneData(studentId, classRoomId),
  });
};

const useStudentRoomCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.postStudentRoomData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siswa_kelas"] });
    },
  });
};

const useStudentRoomUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.editStudentRoomData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siswa_kelas"] });
    },
  });
};

const useStudentRoomDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.deleteStudentRoomData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siswa_kelas"] });
    },
  });
};

const useDataByClassAndPeriode = (classRoomId: number, periodeId: number) => {
  let uniqueId = periodeId + classRoomId;
  return useQuery<any, Error>({
    queryKey: ["siswa_kelas_", uniqueId],
    queryFn: () => StudentService.getDataByClassAndPeriode(classRoomId,periodeId),
  });
};

export {
  useDataByClassAndPeriode,
  useAvailablePosts,
  useCreatePost,
  useUpdatePost,
  usePostById,
  useAllPosts,
  useDeletePost,
  useStudentRoomCreatePost,
  useStudentRoomUpdatePost,
  useStudentRoomPostById,
  useStudentRoomAllPosts,
  useStudentRoomDeletePost,
};
