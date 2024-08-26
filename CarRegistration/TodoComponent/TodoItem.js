import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function TodoItem({ val, DeleteTodo }) {
    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {val.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Description:</strong> {val.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => DeleteTodo(val._id)}
                >
                    Delete
                </Button>
                <Button 
                    variant="outlined" 
                    component={Link} 
                    to={`${val._id}`} 
                    sx={{ ml: 1 }}
                >
                    View Todo
                </Button>
            </CardActions>
        </Card>
    );
}

export default TodoItem;
