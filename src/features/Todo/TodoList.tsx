import { Todo } from 'types';
import TodoItem from 'components/TodoItem';
import { useAppDispatch, useAppSelector } from 'redux-hook';
import { removeTodo, toggleTodo } from './todoSlice';
import { selectAllTodos } from './todoSelectors';

const TodoList = () => {
    const list = useAppSelector(selectAllTodos);
    const dispatch = useAppDispatch();

    const handleRemoveTodo = (id: Todo['id']) => {
        dispatch(removeTodo(id));
    };

    const handleToggleTodo = (id: Todo['id']) => {
        dispatch(toggleTodo(id));
    };

    return (
        <ul>
            {list.map((todo) => (
                <TodoItem
                    key={todo.id}
                    removeTodo={handleRemoveTodo}
                    toggleTodo={handleToggleTodo}
                    {...todo}
                />
            ))}
        </ul>
    );
};

export default TodoList;
