import { useState } from "react";
function Addtwo(){
    let [num1, setsum1] = useState("Number1");
    let [num2, setsum2] = useState("Number2");
    let[sum, setsum] = useState("Nan");
    function num1sum(e){
        setsum1(e.target.value);
    }
    function num2sum(e){
        setsum2(e.target.value);
    }
    function add(){
        sum = Number(num1)+ Number(num2);
        setsum(sum);
    }
    return(
        <div className="Addtwo">
            <h2>Sum of Two Numbers</h2>
            <input type="number" name="num1" onChange={num1sum} placeholder="Enter Number1"/>
            <input type="number" name="num2" onChange={num2sum} placeholder="Enter Number2"/>
            <button onClick={add}>Add Number</button>
            <h1>{sum}</h1>
        </div>
    );
}
export default Addtwo;