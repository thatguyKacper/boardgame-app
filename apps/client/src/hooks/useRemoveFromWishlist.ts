import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromWishlist as remove } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { Auth } from '../types/auth';

export default function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  const { mutate: removeFromWishlist, isLoading } = useMutation({
    mutationFn: (auth: Auth) => remove(auth.id, auth.token),
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
