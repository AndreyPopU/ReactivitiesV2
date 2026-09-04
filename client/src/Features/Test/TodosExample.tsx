import { Button, Typography } from '@mui/material';
import { useTodos } from '../../lib/hooks/TestHook';

export default function Todos() {
    const { todosQuery, addTodoMutation, removeTodoMutation, isPendingAdd, isPendingRemove } = useTodos();

    if (todosQuery.isPending) {
        return <Typography>Loading...</Typography>;
    }

    if (todosQuery.isError) {
        return <Typography>{todosQuery.error.message}</Typography>;
    }

    if (todosQuery.isSuccess) {
        return (
            <>
                <ul>
                    {todosQuery.data.map((todo) => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                    {isPendingAdd && <li>{addTodoMutation.variables}</li>}
                </ul>

                <Button onClick={() => { addTodoMutation.mutate(todosQuery.data.length-1 + " New Todo") }} 
                color="primary" variant="contained" disabled={isPendingAdd}>
                    Add Todo
                </Button>

                <Button onClick={() => { removeTodoMutation.mutate(todosQuery.data[todosQuery.data.length - 1]) }} 
                color="error" variant="contained" disabled={isPendingRemove}>
                    Remove Todo
                </Button>
            </>
        );
    }
}