import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    IconButton,
    Paper
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskModal from '../../components/Modal/AddTaskModal';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, deleteTask, moveTask, updateTasksStage } from '../../redux/features/taskSlice';
import { v4 as uuidv4 } from 'uuid';
const defaultTheme = createTheme();

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high':
            return '#f44336'; // red
        case 'medium':
            return '#ff9800'; // orange
        case 'low':
            return '#4caf50'; // green
        default:
            return '#9e9e9e'; // grey
    }
}

export default function TaskManagement() {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    // console.log("tasks", tasks);
    const stages = ['Backlog', 'To Do', 'Ongoing', 'Done'];

    const [open, setOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleClickOpen = () => {
        setTaskToEdit(null); // Reset task to edit
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveTask = (task) => {
        if (taskToEdit) {
            dispatch(editTask({ id: taskToEdit.id, updates: task }));
        } else {
            dispatch(addTask({ ...task, id: uuidv4(), stage: 0 }));
        }
        setOpen(false);
    };

    const handleMoveTask = (taskId, direction) => {
        dispatch(moveTask({ id: taskId, direction }));
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

    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setTaskToDelete(null);
    };

    const handleDragStart = () => {
        setIsDragging(true); // Show delete area when dragging starts
    };

    const handleDragEnd = (result) => {
        setIsDragging(false);
        // console.log("handleDragEnd", result);
        if (!result.destination) return;

        const { source, destination, draggableId } = result;
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return; // If the task is dropped in the same position, do nothing
        }

        if (destination.droppableId === 'trash') {
            setTaskToDelete(draggableId);
            setConfirmOpen(true);
        } else {
            const updatedTask = { id: draggableId, stage: parseInt(destination.droppableId, 10) };
            dispatch(updateTasksStage(updatedTask));
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <Header />
                <Sidebar />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            Task Management Board
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Add Task
                        </Button>
                        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                {stages?.map((stage, stageIndex) => (
                                    <Grid item xs={3} key={stageIndex}>
                                        <Typography variant="h6">{stage}</Typography>
                                        <Droppable droppableId={`${stageIndex}`} key={stageIndex}>
                                            {(provided) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    sx={{ minHeight: 400, p: 1, border: '1px solid #ddd', borderRadius: 1, backgroundColor: '#f9f9f9' }}
                                                >
                                                    {tasks
                                                        ?.filter((task) => task.stage === stageIndex)
                                                        ?.map((task, index) => (
                                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                                {(provided) => (
                                                                    <Paper
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        sx={{ mb: 2, p: 2, backgroundColor: getPriorityColor(task.priority) }}
                                                                    >
                                                                        <Typography>{task.name}</Typography>
                                                                        <Typography>Priority: {task.priority}</Typography>
                                                                        <Typography>Deadline: {task.deadline}</Typography>
                                                                        <Box>
                                                                            <IconButton
                                                                                onClick={() => handleMoveTask(task.id, -1)}
                                                                                disabled={task.stage === 0}
                                                                            >
                                                                                <ArrowBackIcon />
                                                                            </IconButton>
                                                                            <IconButton
                                                                                onClick={() => handleMoveTask(task.id, 1)}
                                                                                disabled={task.stage === stages.length - 1}
                                                                            >
                                                                                <ArrowForwardIcon />
                                                                            </IconButton>
                                                                            <IconButton onClick={() => handleEditTask(task.id)}>
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                            <IconButton onClick={() => handleDeleteTask(task.id)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </Box>
                                                                    </Paper>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                    {provided.placeholder}
                                                </Box>
                                            )}
                                        </Droppable>
                                    </Grid>
                                ))}
                            </Grid>
                            <Droppable droppableId="trash">
                                {(provided) => (
                                    <Box
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        sx={{
                                            position: 'fixed',
                                            bottom: 10,
                                            right: 10,
                                            p: 2,
                                            border: isDragging ? '1px solid #ddd' : 'none',
                                            borderRadius: 1,
                                            backgroundColor: isDragging ? '#f9f9f9' : 'transparent',
                                            display: isDragging ? 'flex' : 'none',
                                            flexDirection: 'column', // Ensure the children are stacked vertically
                                            alignItems: 'center'
                                        }}
                                        style={{ display: 'flex' }} 

                                    >
                                        {isDragging && 
                                        <>
                                        <Typography>Drag here to delete</Typography>
                                        <IconButton>
                                            <DeleteIcon color='error'/>
                                        </IconButton>
                                        </>}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Container>
                </Box>
            </Box>
            <AddTaskModal
                open={open}
                handleClose={handleClose}
                handleSaveTask={handleSaveTask}
                taskToEdit={taskToEdit}
            />
            <ConfirmationModal
                open={confirmOpen}
                handleClose={handleCancelDelete}
                handleConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this task?"
            />
        </ThemeProvider>
    );
}
