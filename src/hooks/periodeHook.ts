import PeriodeService from "@/services/periodeService";
import { Periode } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface updateParams {
  data: any;
  id: Number;
}

const useAllPosts = () => {
  return useQuery<Periode[], Error>({
    queryKey: ["periodes"],
    queryFn: () => PeriodeService.getAllData(),
  });
};

const usePostById = (id: Number) => {
  return useQuery<Periode, Error>({
    queryKey: ["periodes",id],
    queryFn: () => PeriodeService.getOneData(id),
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PeriodeService.postData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['periodes']})
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PeriodeService.editData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['periodes']})
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PeriodeService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['periodes']})
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
