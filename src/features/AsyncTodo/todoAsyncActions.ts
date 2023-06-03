import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from 'types';
import { TodoSlice } from './asyncTodoSlice';

export const fetchAllTodos = createAsyncThunk<
    Todo[],
    undefined,
    { state: { asyncTodos: TodoSlice } }
>(
    'todos/fetchTodos',
    async () => {
        const responce = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        return await responce.json();
    },
    {
        condition: (_, { getState }) => {
            const { status } = getState().asyncTodos;
            if (status === 'loading') {
                return false;
            }
        },
    },
);

export const createTodo = createAsyncThunk<Todo, string>(
    'todo/createTodo',
    async (text: string) => {
        const newTodo: Required<Omit<Todo, 'id'>> = {
            title: text,
            userId: 1,
            completed: false,
        };

        const responce = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
        });
        return await responce.json();
    },
);

export const toggleTodo = createAsyncThunk<Todo, Todo>('todo/toggleTodo', async (todo: Todo) => {
    const responce = await fetch('https://jsonplaceholder.typicode.com/todos/' + todo.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
    });
    return await responce.json();
});

export const deleteTodo = createAsyncThunk<Todo['id'], Todo['id'], { rejectValue: string }>(
    'todo/deleteTodo',
    async (id: Todo['id'], { rejectWithValue }) => {
        const responce = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!responce.ok) {
            return rejectWithValue('Imposible remove todo with id' + id);
        }
        return id;
    },
);
