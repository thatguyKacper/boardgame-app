import { useMutation } from '@tanstack/react-query';
import { addAsPlayed as played } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';

export default function useAddAsPlayed() {
  const { mutate: addAsPlayed, isLoading } = useMutation({
    mutationFn: ({ gameId, token }) => played(gameId, token),
    onSuccess: () => {
      toast.success('Boardgame added as played');
    },
    onError: (err) => {
      console.log(err);
      toast.error('Could not add boardgame');
    },
  });

  return { addAsPlayed, isLoading };
}
