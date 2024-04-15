import SchoolService from "@/services/schoolService";
import { Schools } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const useAllPosts = () => {
  return useQuery<Schools[], Error>({
    queryKey: ["school"],
    queryFn: () => SchoolService.getAllData(),
  });
};

const usePostById = (id: Number) => {
  return useQuery<Schools, Error>({
    queryKey: ["school",id],
    queryFn: () => SchoolService.getOneData(id),
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SchoolService.postData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['school']})
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SchoolService.editData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['school']})
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SchoolService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['school']})
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
