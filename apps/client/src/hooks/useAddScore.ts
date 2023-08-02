import { useMutation } from '@tanstack/react-query';
import { addScore as scoreFn } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { BoardgameScore } from '../types/boardgame';

export default function useAddScore() {
  const { mutate: addScore } = useMutation({
    mutationFn: (auth: BoardgameScore) => scoreFn(auth.boardgameId, auth.token, auth.score),
    onSuccess: () => {
      toast.success(`Boardgame scored`);
    },
    onError: (err) => {
      console.log(err);
      toast.error('Could not add score');
    },
  });

  return { addScore };
}
