import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromWishlist as remove } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';

export default function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  const { mutate: removeFromWishlist, isLoading } = useMutation({
    mutationFn: ({ gameId, token }) => remove(gameId, token),
    onSuccess: () => {
      toast.success('Boardgame removed from wishlist');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error('Could not remove boardgame');
    },
  });

  return { removeFromWishlist, isLoading };
}
