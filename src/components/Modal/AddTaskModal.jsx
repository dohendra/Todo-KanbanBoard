import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const AddTaskModal = ({ open, handleClose, handleSaveTask, taskToEdit }) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setPriority(taskToEdit.priority);
      setDeadline(taskToEdit.deadline);
    } else {
      setTaskName('');
      setPriority('');
      setDeadline('');
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (!taskName || !priority || !deadline) {
      setError('All fields are required.');
      return;
    }
    const task = {
      // id: taskToEdit ? taskToEdit.id : uuidv4(), 
      name: taskName,
      priority,
      deadline,
      stage: taskToEdit ? taskToEdit.stage : 0
    };
    handleSaveTask(task);
    handleClose();
    setTaskName('');
    setPriority('');
    setDeadline('');
  };
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{taskToEdit ? 'Edit Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {taskToEdit ? 'Update the task details below.' : 'To create a new task, please enter the task name, priority, and deadline.'}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Task Name"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Deadline"
          type="date"
          fullWidth
          InputProps={{ inputProps: { min: new Date().toISOString().slice(0, 10) } }}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          {taskToEdit ? 'Save Changes' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
