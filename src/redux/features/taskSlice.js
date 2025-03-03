import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks?.push(action.payload);
            // state.tasks.push({ id: uuidv4(), ...action.payload });
        },
        editTask: (state, action) => {
            const { id, updates } = action.payload;
            const existingTask = state.tasks.find((task) => task.id === id);
            if (existingTask) {
                Object.assign(existingTask, updates);
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        moveTask: (state, action) => {
            const { id, direction } = action.payload;
            const existingTask = state.tasks.find((task) => task.id === id);
            if (existingTask) {
                existingTask.stage += direction;
            }
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        updateTasksStage: (state, action) => {
            const { id, stage } = action.payload
            const task = state.tasks.find(task => task.id === id)
            if (task) {
                task.stage = stage
            }
        },
        cleartask: (state, action) => {
            state.tasks = [];
        },
    },
});

export const {
    addTask,
    editTask,
    deleteTask,
    moveTask,
    setTasks, cleartask, updateTasksStage
} = taskSlice.actions;

export const selectTotalCreatedTasks = (state) => state?.tasks?.tasks?.length;

export const selectTotalCompletedTasks = (state) =>
    state.tasks.tasks?.filter((task) => task.stage === 3)?.length;

export const selectPendingTasks = (state) =>
    state.tasks.tasks?.filter((task) => task.stage !== 3)?.length;

export default taskSlice.reducer;
