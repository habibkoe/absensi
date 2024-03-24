import ClassRoomService from "@/services/classRoomService";
import { ClassRooms } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface updateParams {
  data: any;
  id: Number;
}

const useAllPosts = () => {
  return useQuery<ClassRooms[], Error>({
    queryKey: ["kelas"],
    queryFn: () => ClassRoomService.getAllData(),
  });
};

const usePostById = (id: Number) => {
  return useQuery<ClassRooms, Error>({
    queryKey: ["kelas",id],
    queryFn: () => ClassRoomService.getOneData(id),
  });
};

const usePostByIdSpecial = (category: any, id: Number) => {
  
  let uniqueKey = `kelas${category}-${id}`

  return useQuery<ClassRooms, Error>({
    queryKey: [uniqueKey],
    queryFn: () => ClassRoomService.getOneData(id),
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ClassRoomService.postData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['kelas']})
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ClassRoomService.editData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['kelas']})
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ClassRoomService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['kelas']})
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
