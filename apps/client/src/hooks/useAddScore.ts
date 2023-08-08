import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addScore as scoreFn } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { BoardgameAction } from '../interfaces/boardgame';

export default function useAddScore() {
  const queryClient = useQueryClient();

  const { mutate: addScore } = useMutation({
    mutationFn: (auth: BoardgameAction) => scoreFn(auth.boardgameId, auth.token, auth.score),
    onSuccess: () => {
      toast.success(`Boardgame scored`);
      queryClient.invalidateQueries({
        queryKey: ['boardgame'],
    });
    },
    onError: () => {
      toast.error('Could not add score');
    },
  });

  return { addScore };
}
