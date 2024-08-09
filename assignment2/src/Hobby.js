import { useState } from "react";
function Hobby(){
    let todoInitialValue = [];
    let [todos, settodos] = useState(todoInitialValue);
    let [todoEntered, setTodoEntered] = useState("");
    function changeTodoEntered(e){
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        setTodoEntered(e.target.value);
    }
    function addHobby(){
        let newTodoArr = [...todos, todoEntered];
        settodos(newTodoArr);
    }
    function deleteTodo(indexToDelete){
        let newTodos = todos.filter(function (val,index){
            if (indexToDelete == index) return false;
            return true;
        });
        settodos(newTodos);
    }
    function clearAll(){
        let newTodos = [];
        settodos(newTodos);
    }
    return(
        <div className="Hobby">
            <h2>Favorite Hobby</h2>
            <input type="text" name="todoitem" value={todoEntered} onChange={changeTodoEntered} placeholder="Enter Hobby"/>
            <button onClick={addHobby}>Add Hobby</button>
            <button onClick={clearAll}>ClearAll</button>
            {todos.map(function (val, index){
            return <div>{val}
            <button onClick={function (){
                deleteTodo(index);
            }}>Delete</button>
            </div>;
} )}
        </div>
    );
}
export default Hobby;