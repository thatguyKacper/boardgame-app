import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromPlayed as remove } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { BoardgameAction } from '../interfaces/boardgame';

export default function useRemoveFromPlayed() {
  const queryClient = useQueryClient();

  const { mutate: removeFromPlayed, isLoading } = useMutation({
    mutationFn: (auth: BoardgameAction) => remove(auth.boardgameId, auth.token),
    onSuccess: () => {
      toast.success('Boardgame removed from played');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: () => {
      toast.error('Could not remove boardgame');
    },
  });

  return { removeFromPlayed, isLoading };
}
