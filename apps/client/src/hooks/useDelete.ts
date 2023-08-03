import { useMutation } from '@tanstack/react-query';
import { deleteAccount as authApi } from '../auth/api-auth';
import { useNavigate } from 'react-router-dom';
import { clearSession } from '../auth/auth-helper';
import toast from 'react-hot-toast';
import { Auth } from '../interfaces/auth';

export default function useDelete() {
  const navigate = useNavigate();

  const { mutate: remove, isLoading } = useMutation({
    mutationFn: (auth: Auth) => authApi(auth.id, auth.token),
    onSuccess: () => {
      toast.success('Deleted successfully');
      clearSession();
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error('Could not delete account');
    },
  });

  return { remove, isLoading };
}
