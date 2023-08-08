import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToWishlist as wishlist } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { Auth } from '../interfaces/auth';

export default function useAddToWishlist() {
  const queryClient = useQueryClient();

  const { mutate: addToWishlist, isLoading } = useMutation({
    mutationFn: (auth: Auth) => wishlist(auth.id, auth.token),
    onSuccess: () => {
      toast.success('Boardgame added to wishlist');
      queryClient.invalidateQueries({
        queryKey: ['boardgame'],
    });
    },
    onError: () => {
      toast.error('Boardgame alredy on list');
    },
  });

  return { addToWishlist, isLoading };
}
