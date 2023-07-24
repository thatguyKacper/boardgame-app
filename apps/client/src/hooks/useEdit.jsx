import { useMutation } from '@tanstack/react-query';
import { editAccount as authApi } from '../auth/api-auth';

export default function useEdit() {
  const { mutate: edit, isLoading } = useMutation({
    mutationFn: ({ id, token, password, retypedPassword }) =>
      authApi(id, token, password, retypedPassword),
    onError: (err) => {
      console.log(err);
      throw new Error(err.message);
    },
  });

  return { edit, isLoading };
}
