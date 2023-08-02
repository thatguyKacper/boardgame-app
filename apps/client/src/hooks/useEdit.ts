import { useMutation } from '@tanstack/react-query';
import { editAccount as authApi } from '../auth/api-auth';
import toast from 'react-hot-toast';
import { UserEditAuth } from '../types/auth';

export default function useEdit() {
  const { mutate: edit, isLoading } = useMutation({
    mutationFn: (auth: UserEditAuth) =>
      authApi(auth.id, auth.token, auth.password, auth.retypedPassword),
    onSuccess: () => {
      toast.success('Password changed');
    },
    onError: (err) => {
      console.log(err);
      toast.error('Passwords are not identical');
    },
  });

  return { edit, isLoading };
}
