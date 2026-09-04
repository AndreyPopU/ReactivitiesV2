import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import type { Todo } from '../types/index';

export const useTodos = (id?: string) => {
    const queryClient = useQueryClient();

    const todosQuery = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await agent.get('/todos');
            return response.data;
        }
    });

    const singleTodoQuery = useQuery<Todo>({
        queryKey: ['todos', id],
        enabled: !!id,
        queryFn: async () => {
            const response = await agent.get(`/todos/${id}`);
            return response.data;
        }
    })

    const addTodoMutation = useMutation({
        mutationFn: async (title: string) => {
            return agent.post('/todos', { title });
        },
        onError: (err) => {
            console.error('Error adding todo:', err);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        },
    });

    const removeTodoMutation = useMutation({
        mutationFn: async (todo: Todo) => {
            return agent.delete(`/todos/${todo.id}`);
        },
        onMutate: async (todo) => {
            // Stop outgoing refetches so they don't overwrite the optimistic update
            await queryClient.cancelQueries({queryKey:['todos']});
            
            const previousTodos: Todo[] | undefined = queryClient.getQueryData<Todo[]>(['todos']);

            // Optimistically update to the new value
            queryClient.setQueryData<Todo[]>(['todos'], (currentTodos) =>
            currentTodos?.filter((currentTodo) => currentTodo.id !== todo.id) ?? []);

            return { previousTodos };
        },
        onError: (err, _todo, context) => {
            queryClient.setQueryData(['todos'], context?.previousTodos);
            console.error('Error removing todo:', err);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        }
    });

    return {
        todosQuery,
        addTodoMutation,
        removeTodoMutation,
        singleTodoQuery,
        isPendingAdd: addTodoMutation.isPending,
        isPendingRemove: removeTodoMutation.isPending,
        isPending: todosQuery.isPending,
        variables: addTodoMutation
    };
};