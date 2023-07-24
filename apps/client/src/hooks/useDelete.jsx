import { useMutation } from '@tanstack/react-query';
import { deleteAccount as authApi } from '../auth/api-auth';
import { useNavigate } from 'react-router-dom';
import { clearSession } from '../auth/auth-helper';

export default function useDelete() {
  const navigate = useNavigate();

  const { mutate: remove, isLoading } = useMutation({
    mutationFn: ({ id, token }) => authApi(id, token),
    onSuccess: () => {
      clearSession();
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      throw new Error(err.message);
    },
  });

  return { remove, isLoading };
}
