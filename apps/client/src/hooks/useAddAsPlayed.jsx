import { useMutation } from '@tanstack/react-query';
import { addAsPlayed as played } from '../boardgames/api-boardgames';

export default function useAddAsPlayed() {
  const { mutate: addAsPlayed, isLoading } = useMutation({
    mutationFn: ({ gameId, token }) => played(gameId, token),
    onSuccess: () => {
      console.log('success');
    },
    onError: (err) => {
      console.log(err);
      throw new Error(err.message);
    },
  });

  return { addAsPlayed, isLoading };
}
