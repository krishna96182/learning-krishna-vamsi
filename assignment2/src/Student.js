import { useState } from "react";
function Student(){
    let [studentName, StudentNameVal] = useState("");
    let [studentAge, StudentAgeVal] = useState("");
    let[resultAr, resultVal] = useState([]);
    let studentData = function(){
        this.name = studentName;
        this.age = studentAge;
    }
    function studentname1(e){
    StudentNameVal(e.target.value);
}
function studentage1(e){
    StudentAgeVal(e.target.value);
}
function Addstu(name, age){
    let studentOb = new studentData();
    let newResult = [...resultAr, studentOb]
    resultVal(newResult);
}
function deleteTodo(indexToDelete){
    let newTodos = resultAr.filter(function (val,index){
        if (indexToDelete == index) return false;
        return true;
    });
    resultVal(newTodos);
}
function clearAll(){
    resultVal([])
}
return (
        <div className="Student">
        <h2>Student Details</h2>
        <input type="text" name="name" value={studentName} onChange={studentname1} placeholder="Enter Name"/>
        <input type="text" name="age" value={studentAge} onChange={studentage1} placeholder="Enter Age"/>
        <button onClick={function(){
            Addstu(); 
        }}>Addstudent</button>
        <button onClick={clearAll}>ClearAll</button>
        {resultAr.map(function (val, index){
            return <div>Student Name:{val.name} Age:{val.age}
            <button onClick={function (){
                deleteTodo(index);
            }}>Delete</button>
            </div>;
} )}
        </div>
    );
}
export default Student;