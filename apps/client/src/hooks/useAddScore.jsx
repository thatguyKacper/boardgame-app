import { useMutation } from '@tanstack/react-query';
import { addScore as scoreFn } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';

export default function useAddScore() {
  const { mutate: addScore } = useMutation({
    mutationFn: ({ gameId, token, score }) => scoreFn(gameId, token, score),
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
