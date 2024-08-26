import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TodoDetails() {
    const [todoData, setTodoData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/todo/${id}`)
            .then(response => {
                setTodoData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <div>
            <div><strong>Title:</strong>{todoData.name}</div>
            <div><strong>Status:</strong> {todoData.status}</div>
            <div><strong>Description:</strong>{todoData.description}</div>
            <div><strong>Todo ID: </strong>{todoData._id}</div>
            <Link to={`edit`}>Edit Todo</Link>
        </div>
    );
}

export default TodoDetails;