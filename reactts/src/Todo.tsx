import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';

interface Todo {
  id: number;
  name: string;
  status: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodoStatus, setNewTodoStatus] = useState<'complete' | 'incomplete'>('incomplete');

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('There was an error!', error));
  }, [todos]);

  const addTodo = () => {
    const statusBoolean = newTodoStatus === 'complete';
    axios.post('http://localhost:3001/todos', { name: newTodoName, status: statusBoolean })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('There was an error!', error));
  };

  const deleteTodo = (id: number) => {
    axios.delete(`http://localhost:3001/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('There was an error!', error));
  };

  return (
    <div className="todo-container">
      <h1>Todo</h1>
      <div className="input-container">
        <label htmlFor="todo-name">Name:</label>
        <input
          id="todo-name"
          type="text"
          placeholder="New Todo"
          value={newTodoName}
          onChange={e => setNewTodoName(e.target.value)}
          className="todo-input"
        />
        <label htmlFor="todo-status">Status:</label>
        <select
          id="todo-status"
          value={newTodoStatus}
          onChange={e => setNewTodoStatus(e.target.value as 'complete' | 'incomplete')}
          className="todo-select"
        >
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <button onClick={addTodo} className="add-todo-button">Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.name}</span> - 
            <span>{todo.status ? 'Complete' : 'Incomplete'}</span>
            <button onClick={() => deleteTodo(index)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
