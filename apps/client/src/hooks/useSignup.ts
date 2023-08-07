import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../auth/api-auth';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../auth/auth-helper';
import toast from 'react-hot-toast';
import { UserAuth } from '../interfaces/auth';
import { capitalizeFirstLetter } from '../helpers/string-helper';

export default function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (auth: UserAuth) => signupApi( auth.email, auth.password ),
    onSuccess: (data) => {
      toast.success('Account created');
      authenticate(data);
      navigate('/', { replace: true });
    },
    onError: (err: Error) => {
      console.log(err);
      toast.error(capitalizeFirstLetter(err.message) + '!')
    },
  });

  return { signup, isLoading };
}
