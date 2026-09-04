import { useParams } from "react-router";
import { useTodos } from "../../lib/hooks/TestHook";

export default function SingleTodo() {
  const { id } = useParams<{ id: string }>();
  const { singleTodoQuery } = useTodos(id);
  
  return (
    <>
        {singleTodoQuery.isPending && <p>Loading...</p>}

        {singleTodoQuery.isError && <p>{singleTodoQuery.error.message}</p>}

        {singleTodoQuery.isSuccess && <p>{singleTodoQuery.data.title}</p>}

    </>
  )
}
