import StudentRoomService from "@/services/studentRoomService";
import { StudentsOnClassRooms } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface updateParams {
  data: any;
  id: Number;
}

const useAllPosts = () => {
  return useQuery<any[], Error>({
    queryKey: ["siswa_kelas"],
    queryFn: () => StudentRoomService.getAllData(),
  });
};

const usePostById = (studentId: number, classRoomId: number) => {
  let uniqueId = studentId + classRoomId;
  return useQuery<any, Error>({
    queryKey: ["siswa_kelas_", uniqueId],
    queryFn: () => StudentRoomService.getOneData(studentId, classRoomId),
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentRoomService.postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siswa_kelas"] });
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentRoomService.editData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siswa_kelas"] });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentRoomService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siswa_kelas"] });
    },
  });
};

export {
  useCreatePost,
  useUpdatePost,
  usePostById,
  useAllPosts,
  useDeletePost,
};
