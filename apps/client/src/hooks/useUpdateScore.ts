import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateScore as scoreFn } from '../boardgames/api-boardgames';
import toast from 'react-hot-toast';
import { BoardgameAction } from '../interfaces/boardgame';

export default function useUpdateScore() {
const queryClient = useQueryClient();

const { mutate: updateScore } = useMutation({
    mutationFn: (auth: BoardgameAction) => scoreFn(auth.boardgameId, auth.token, auth.score || 0),
    onSuccess: () => {
        toast.success(`Scored updated`);
        queryClient.invalidateQueries({
            queryKey: ['user'],
        });
        queryClient.invalidateQueries({
            queryKey: ['boardgame'],
        });
    },
    onError: () => {
        toast.error('Could not update score');
    },
});

return { updateScore };
}
