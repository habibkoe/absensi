import MapelService from "@/services/mapelService";
import { MataPelajarans } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface updateParams {
  data: any;
  id: Number;
}

const useAllPosts = () => {
  return useQuery<MataPelajarans[], Error>({
    queryKey: ["mapels"],
    queryFn: () => MapelService.getAllData(),
  });
};

const usePostById = (id: Number) => {
  return useQuery<MataPelajarans, Error>({
    queryKey: ["mapels",id],
    queryFn: () => MapelService.getOneData(id),
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MapelService.postData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mapels']})
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MapelService.editData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mapels']})
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MapelService.deleteData,
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
