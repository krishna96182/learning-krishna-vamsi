import React from 'react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid } from '@mui/material';

function TodoForms({ todoEntered, changeTodo, setStatus, addTodo, descriptionEntered, changeDescription, status }) {
    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <h1>Todo Details</h1>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        label="Enter a Name"
                        value={todoEntered}
                        onChange={changeTodo}
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        label="Enter a Description"
                        value={descriptionEntered}
                        onChange={changeDescription}
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="incompleted">Incompleted</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addTodo}
                    fullWidth
                >
                    Add Todo
                </Button>
            </Grid>
        </Grid>
    );
}

export default TodoForms;
