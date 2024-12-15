import { useSelector,useDispatch} from "react-redux";
import { useState } from "react";
import { Addaction,DeleteAction,DeleteAllAction,EditAction } from "../actions/actions";
const ReduxTodo = () =>{
    const dispatch = useDispatch();
    const todos = useSelector((state) => {
        return state.todos.todos;
    })
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const addTodos = (e) => {
        e.preventDefault();
        const todo = {name: e.target.name.value, status : e.target.status.value}
        dispatch(Addaction(todo))
    }
    const handleDelete = (index) => {
        dispatch(DeleteAction(index));
    };
    const submitEdit = (e) => {
        e.preventDefault();
        const updatedTodo = { name: editName, status: editStatus };
        dispatch(EditAction(editIndex, updatedTodo));
        setEditIndex(null);
        setEditName("");
        setEditStatus("");
    };
    const handleDeleteAll = () => {
        dispatch(DeleteAllAction());
    };
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditName(todos[index].name);
        setEditStatus(todos[index].status);
    };
    return(
        <div>
            <form onSubmit={addTodos}>
                <input type="text" name="name"/>
                <select name="status">
                    <option value="complete">Complete</option>
                    <option value="Incomplete">InComplete</option>
                </select>
                <button>Add Todo</button>
            </form>
            <button onClick={handleDeleteAll}>Delete All Todos</button>
            {todos.map((val,index)=> {
                return (
                    <div key={index} className="todo-item">
                        <div>Name:{val.name}</div>
                        <div>Status:{val.status}</div>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                    </div>
                )
            })}
            {editIndex !== null && (
            <form onSubmit={submitEdit} className="edit-form">
            <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
            />
            <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
            </select>
            <button>Update Todo</button>
            </form>
        )}
        </div>
    )
}
export default ReduxTodo;