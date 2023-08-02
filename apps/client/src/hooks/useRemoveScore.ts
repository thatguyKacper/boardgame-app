import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeScore as remove } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { Auth } from '../types/auth';

export default function useRemoveScore() {
  const queryClient = useQueryClient();

  const { mutate: removeScore, isLoading } = useMutation({
    mutationFn: (auth: Auth) => remove(auth.id, auth.token),
    onSuccess: () => {
      toast.success('Score removed');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error('Could not remove score');
    },
  });

  return { removeScore, isLoading };
}
