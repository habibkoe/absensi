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

// user mapel
const usePostByUserId = (typeData: any, id: Number) => {
  return useQuery<any[], Error>({
    queryKey: ["mapels-user",id],
    queryFn: () => MapelService.getUserMapelByUserData(typeData, id),
  });
};

const useUserMapelPostById = (classRoomId : any, id: Number) => {
  return useQuery<any, Error>({
    queryKey: ["mapels-user", id],
    queryFn: () => MapelService.getUserMapelOneData(classRoomId, id),
  });
};

const useUserMapelCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MapelService.postUserMapelData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mapels-user']})
    },
  });
};

const useUserMapelUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MapelService.editUserMapelData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mapels-user']})
    },
  });
};

const useUserMapelDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MapelService.deleteUserMapelData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mapels-user']})
    },
  });
};

export {
  useUserMapelDeletePost,
  useUserMapelUpdatePost,
  useUserMapelCreatePost,
  useUserMapelPostById,
  usePostByUserId,
  useCreatePost,
  useUpdatePost,
  usePostById,
  useAllPosts,
  useDeletePost,
};
