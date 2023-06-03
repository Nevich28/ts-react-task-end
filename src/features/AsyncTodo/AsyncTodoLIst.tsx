import { useEffect } from 'react';
import { Todo } from 'types';
import TodoItem from 'components/TodoItem';
import { useAppDispatch, useAppSelector } from 'redux-hook';
import { selectAsyncTodos } from './asyncTodoSelectors';
import { deleteTodo, fetchAllTodos, toggleTodo } from './todoAsyncActions';

const AsyncTodoList = () => {
    const { list } = useAppSelector(selectAsyncTodos);
    const dispatch = useAppDispatch();

    const handleRemoveTodo = (id: Todo['id']) => {
        dispatch(deleteTodo(id));
    };

    // const handleToggleTodo = (id: Todo['id']) => {
    const handleToggleTodo = (todo: Todo) => {
        dispatch(toggleTodo(todo));
    };

    useEffect(() => {
        dispatch(fetchAllTodos());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul>
            {list.map((todo) => (
                <TodoItem
                    key={todo.id}
                    removeTodo={() => handleRemoveTodo(todo.id)}
                    toggleTodo={() => handleToggleTodo(todo)}
                    {...todo}
                />
            ))}
        </ul>
    );
};

export default AsyncTodoList;
