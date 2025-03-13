// This is an updated version of your taskSlice.js file with the editTask.fulfilled case added

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API Base URL
const API_URL = 'https://dummyjson.com/todos';

// Fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.todos;
});

// Add a new task
export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: task.todo,
            completed: false, 
            userId: 1,
        }),
    });
    return response.json();
});

// Edit task - Updated to return the id and updates
export const editTask = createAsyncThunk('tasks/editTask', async ({ id, updates }) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });

    const data = await response.json();
    return { id, updates };
});

// Delete task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return id;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {
        cleartask: (state) => {
            state.tasks = [];
        },
        updateTask: (state, action) => {
            const { id, updates } = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(editTask.fulfilled, (state, action) => {
                const { id, updates } = action.payload;
                const taskIndex = state.tasks.findIndex((task) => task.id === id);
                if (taskIndex !== -1) {
                    state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            });
    },
});

// Selectors
export const selectTotalCreatedTasks = (state) => state.tasks.tasks.length;

export const selectTotalCompletedTasks = (state) =>
    state.tasks.tasks.filter((task) => task.completed).length;

export const selectPendingTasks = (state) =>
    state.tasks.tasks.filter((task) => !task.completed).length;

export const { cleartask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;