import { useMutation } from '@tanstack/react-query';
import { signin as signinApi } from '../auth/api-auth';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../auth/auth-helper';
import toast from 'react-hot-toast';

export default function useSignin() {
  const navigate = useNavigate();

  const { mutate: signin, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signinApi({ email, password }),
    onSuccess: (data) => {
      toast.success('Logged in');
      authenticate(data);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error('Wrong email or password');
    },
  });

  return { signin, isLoading };
}
