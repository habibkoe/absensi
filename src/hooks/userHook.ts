import UserService from "@/services/userService";
import { Users } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useAllPosts = () => {
  return useQuery<Users[], Error>({
    queryKey: ["users"],
    queryFn: () => UserService.getAllData(),
  });
};

const usePostById = (id: Number) => {
  return useQuery<Users, Error>({
    queryKey: ["users", id],
    queryFn: () => UserService.getOneData(id),
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.editData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// User Room Hook
const useUserRoomPostByUserData = (id: Number) => {
  return useQuery<any[], Error>({
    queryKey: ["users-room", id],
    queryFn: () => UserService.getUserRoomByUserData(id),
  });
};

const useUserRoomPostById = (classRoomId : any, id: Number) => {
  return useQuery<any, Error>({
    queryKey: ["users-room", id],
    queryFn: () => UserService.getUserRoomOneData(classRoomId, id),
  });
};

const useUserRoomCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.postUserRoomData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-room"] });
    },
  });
};

const useUserRoomUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.editUserRoomData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-room"] });
    },
  });
};

const useUserRoomDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.deleteUserRoomData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-room"] });
    },
  });
};

export {
  useUserRoomDeletePost,
  useUserRoomUpdatePost,
  useUserRoomCreatePost,
  useUserRoomPostByUserData,
  useUserRoomPostById,
  useCreatePost,
  useUpdatePost,
  usePostById,
  useAllPosts,
  useDeletePost,
};
