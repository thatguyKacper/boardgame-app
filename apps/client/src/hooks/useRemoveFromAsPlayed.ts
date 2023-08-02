import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromPlayed as remove } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { Auth } from '../types/auth';

export default function useRemoveFromPlayed() {
  const queryClient = useQueryClient();

  const { mutate: removeFromPlayed, isLoading } = useMutation({
    mutationFn: (auth: Auth) => remove(auth.id, auth.token),
    onSuccess: () => {
      toast.success('Boardgame removed from played');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error('Could not remove boardgame');
    },
  });

  return { removeFromPlayed, isLoading };
}
