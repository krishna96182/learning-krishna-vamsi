import { useState, useEffect } from "react";
import axios from "axios";
function Todo(){
    let todoInitialValue = [{name: "Default name", status: "default status"}];
    let [todos, settodos] = useState(todoInitialValue);
    let [todoEntered, setTodoEntered] = useState("Default Todo");
    let [statusEntered, setStatusEntered] = useState("Default status");
    useEffect(function(){
        console.log("function called on load");
        getTodos();
        /* axios.get("todos")
        .then(function (response){
            console.log(response.data);
            settodos(response.data);
        })
        .catch(function (error){
            console.log(error);
        }) */
    },[]);
    function changeTodoEntered(e){
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        setTodoEntered(e.target.value);
    }
    function getTodos(){
        axios
        .get("/todos")
        .then(function (response){
            console.log(response.data);
            settodos(response.data);
        })
        .catch(function (error){
            console.log(error);
        });
    }
    function addHobby(){
        let newTodoObject = {name: todoEntered, status: statusEntered};
        console.log(newTodoObject);
        axios
        .post("/todos", newTodoObject)
        .then(function (response){
            console.log(response);
            if (response.data.status == 1){
                getTodos();
            }
        })
    }
    function deleteTodo(indexToDelete){
        axios.delete( `/todos/${indexToDelete}`)
        .then(function (response){
            console.log(response);
            getTodos();
        })
        .catch(function (error){
            console.log(error);
        });
    }
    function clearAll(){
        let newTodos = [];
        settodos(newTodos);
    }
    return(
        <div>
            <input type="text" name="todoitem" value={todoEntered} onChange={changeTodoEntered}/>
            <select onChange={function (e){
                setStatusEntered(e.target.value);
            }
            }>
                <option value="complete">Completed</option>
                <option value="incomplete">Not Completed</option>
            </select>
            <button onClick={addHobby}>Add Hobby</button>
            <button onClick={clearAll}>ClearAll</button>
            {todos.map(function (val, index){
            return <div>{val.name}
            <button onClick={function (){
                deleteTodo(index);
            }}>Delete</button>
            <div>Status:{val.status}</div>
            </div>;
} )}
        </div>
    );
}
export default Todo;