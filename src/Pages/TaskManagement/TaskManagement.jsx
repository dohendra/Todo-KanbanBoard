import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography, IconButton, Paper, Toolbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, addTask, editTask, deleteTask } from '../../redux/features/taskSlice';
import AddTaskModal from '../../components/Modal/AddTaskModal';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const defaultTheme = createTheme();

export default function TaskManagement() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const [open, setOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleClickOpen = () => {
        setTaskToEdit(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveTask = (task) => {
        if (taskToEdit) {
            dispatch(editTask({ 
                id: taskToEdit.id, 
                updates: { 
                    todo: task.name || task.todo, 
                    completed: task.completed 
                } 
            }));
        } else {
            dispatch(addTask({ todo: task.name, userId: 1 }));
        }
        setOpen(false);
    };

    const handleToggleTaskStatus = (taskId, completed) => {
        dispatch(editTask({ id: taskId,  updates: { completed: !completed } })); 
    };

    const handleEditTask = (taskId) => {
        const task = tasks.find((task) => task.id === taskId);
        setTaskToEdit(task);
        setOpen(true);
    };

    const handleDeleteTask = (taskId) => {
        setTaskToDelete(taskId);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteTask(taskToDelete));
        setConfirmOpen(false);
        setTaskToDelete(null);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            Task Management Board
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Add Task
                        </Button>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            {['Incomplete', 'Completed'].map((status, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Typography variant="h6">
                                        {status}
                                    </Typography>
                                    <Box sx={{ minHeight: 400, p: 2, border: '1px solid #ddd', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
                                        {tasks
                                            ?.filter((task) => task.completed === (status === 'Completed'))
                                            ?.map((task) => (
                                                <Paper key={task.id} sx={{ mb: 2, p: 2, backgroundColor: task.completed ? '#4caf50' : '#f44336' }}>
                                                    <Typography>{task.todo}</Typography>
                                                    <Typography>Status: {task.completed ? "Completed" : "Incomplete"}</Typography>
                                                    <Box>
                                                        <IconButton onClick={() => handleToggleTaskStatus(task.id, task.completed)}>
                                                            {task.completed ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                                                        </IconButton>
                                                        <IconButton onClick={() => handleEditTask(task.id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton onClick={() => handleDeleteTask(task.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Paper>
                                            ))}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <AddTaskModal open={open} handleClose={handleClose} handleSaveTask={handleSaveTask} taskToEdit={taskToEdit} />
            <ConfirmationModal open={confirmOpen} handleClose={() => setConfirmOpen(false)} handleConfirm={handleConfirmDelete} message="Are you sure you want to delete this task?" />
        </ThemeProvider>
    );
}
