import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../auth/api-auth';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../auth/auth-helper';

export default function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signupApi({ email, password }),
    onSuccess: (data) => {
      authenticate(data);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      throw new Error(err.message);
    },
  });

  return { signup, isLoading };
}
