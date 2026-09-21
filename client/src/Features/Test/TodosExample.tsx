import { Button, TextField, Typography } from '@mui/material';
import { useTodos } from '../../lib/hooks/TestHook';
import { useState } from 'react';

export default function Todos() {
    const { AddToDo, todosQuery, addTodoMutation, removeTodoMutation, isPendingAdd, isPendingRemove } = useTodos();
    const [toDoText, setToDoText] = useState('');

    if (todosQuery.isPending) { return <Typography>Loading...</Typography>; }

    if (todosQuery.isError) { return <Typography>{todosQuery.error.message}</Typography>; }

    if (todosQuery.isSuccess) {
        return (
            <>
                <ul>
                    {todosQuery.data.map((todo) => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                    {isPendingAdd && <li>{addTodoMutation.variables}</li>}
                </ul>

                <TextField onChange={e => setToDoText(e.target.value)} value={toDoText}></TextField>

                <br/>
                
                <Button onClick={() => { AddToDo.mutate(toDoText) }}
                    color="primary" variant="contained" disabled={isPendingAdd}>
                    Add Todo New
                </Button>

                <Button onClick={() => { addTodoMutation.mutate(todosQuery.data.length - 1 + " New Todo") }}
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