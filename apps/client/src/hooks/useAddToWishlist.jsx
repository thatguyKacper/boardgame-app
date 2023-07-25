import { useMutation } from '@tanstack/react-query';
import { addToWishlist as wishlist } from '../boardgames/api-boardgames';

export default function useAddToWishlist() {
  const { mutate: addToWishlist, isLoading } = useMutation({
    mutationFn: ({ gameId, token }) => wishlist(gameId, token),
    onSuccess: () => {
      console.log('success');
    },
    onError: (err) => {
      console.log(err);
      throw new Error(err.message);
    },
  });

  return { addToWishlist, isLoading };
}
