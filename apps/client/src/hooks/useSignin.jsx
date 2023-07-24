import { useMutation } from '@tanstack/react-query';
import { signin as signinApi } from '../auth/api-auth';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../auth/auth-helper';

export default function useSignin() {
  const navigate = useNavigate();

  const { mutate: signin, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signinApi({ email, password }),
    onSuccess: (data) => {
      authenticate(data);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      throw new Error(err.message);
    },
  });

  return { signin, isLoading };
}
