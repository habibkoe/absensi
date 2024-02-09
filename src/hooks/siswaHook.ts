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
    queryKey: ["mapels"],
    queryFn: () => StudentService.getAllData(),
  });
};

const usePostById = (id: Number) => {
  return useQuery<Students, Error>({
    queryKey: ["mapels",id],
    queryFn: () => StudentService.getOneData(id),
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.postData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mapels']})
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.editData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mapels']})
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mapels']})
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
