import { useMutation } from '@tanstack/react-query';
import { addToWishlist as wishlist } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { Auth } from '../interfaces/auth';

export default function useAddToWishlist() {
  const { mutate: addToWishlist, isLoading } = useMutation({
    mutationFn: (auth: Auth) => wishlist(auth.id, auth.token),
    onSuccess: () => {
      toast.success('Boardgame added to wishlist');
    },
    onError: (err) => {
      console.log(err);
      toast.error('Could not add boardgame');
    },
  });

  return { addToWishlist, isLoading };
}
