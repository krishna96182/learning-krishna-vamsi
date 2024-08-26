import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, TextField, Select, MenuItem, Button, Box, Typography } from '@mui/material';

function TodoDetailsEdit() {
    const [todoData, setTodoData] = useState({});
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/todo/${id}`)
            .then(response => {
                setTodoData(response.data);
                setStatus(response.data.status);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const editTodo = (e) => {
        e.preventDefault();
        const todoModifiedOb = {
            name: e.target.todoitem.value,
            status: e.target.status.value,
            description: e.target.description.value
        };
        axios.put(`http://localhost:3000/todo/${id}`, todoModifiedOb)
            .then(response => {
                console.log("Todo updated successfully:", response.data);
                navigate(`/todo/${id}`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Edit Todo
                </Typography>
                <form onSubmit={editTodo}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Enter a Name"
                            name="todoitem"
                            value={todoData.name || ''}
                            onChange={(e) => setTodoData({ ...todoData, name: e.target.value })}
                            variant="outlined"
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Enter a Description"
                            name="description"
                            value={todoData.description || ''}
                            onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}
                            variant="outlined"
                        />
                    </Box>
                    <Box mb={2}>
                        <Select
                            fullWidth
                            name="status"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setTodoData({ ...todoData, status: e.target.value });
                            }}
                            variant="outlined"
                        >
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Incompleted">Incompleted</MenuItem>
                        </Select>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                    >
                        Edit Todo
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default TodoDetailsEdit;
