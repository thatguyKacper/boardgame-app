import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAsPlayed as played } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { Auth } from '../interfaces/auth';

export default function useAddAsPlayed() {
  const queryClient = useQueryClient();

  const { mutate: addAsPlayed, isLoading } = useMutation({
    mutationFn: (auth: Auth) => played(auth.id, auth.token),
    onSuccess: () => {
      toast.success('Boardgame added as played');
      queryClient.invalidateQueries({
        queryKey: ['boardgame'],
    });
    },
    onError: () => {
      toast.error('Boardgame alredy on list');
    },
  });

  return { addAsPlayed, isLoading };
}
