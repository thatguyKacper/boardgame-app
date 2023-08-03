import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeScore as remove } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { BoardgameAction } from '../interfaces/boardgame';

export default function useRemoveScore() {
  const queryClient = useQueryClient();

  const { mutate: removeScore, isLoading } = useMutation({
    mutationFn: (auth: BoardgameAction) => remove(auth.boardgameId, auth.token),
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
