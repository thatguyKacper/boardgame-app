import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../auth/api-auth';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../auth/auth-helper';
import toast from 'react-hot-toast';

export default function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signupApi({ email, password }),
    onSuccess: (data) => {
      toast.success('Account created');
      authenticate(data);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error('Email already in use');
    },
  });

  return { signup, isLoading };
}
