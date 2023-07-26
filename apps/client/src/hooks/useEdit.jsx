import { useMutation } from '@tanstack/react-query';
import { editAccount as authApi } from '../auth/api-auth';
import toast from 'react-hot-toast';

export default function useEdit() {
  const { mutate: edit, isLoading } = useMutation({
    mutationFn: ({ id, token, password, retypedPassword }) =>
      authApi(id, token, password, retypedPassword),
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
