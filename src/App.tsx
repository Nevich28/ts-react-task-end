import TodoList from './features/Todo/TodoList';
import './App.css';
import { NewTodo } from 'features/Todo/NewTodo';
import AsyncTodoList from 'features/AsyncTodo/AsyncTodoLIst';
import { NewAcyncTodo } from 'features/AsyncTodo/NewAcyncTodo';

function App() {
    return (
        <div className="App">
            <NewTodo />
            <TodoList />

            <hr />
            <NewAcyncTodo />
            <AsyncTodoList />
        </div>
    );
}

export default App;
