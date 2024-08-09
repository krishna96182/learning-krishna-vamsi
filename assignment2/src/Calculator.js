import { useState } from "react";
function Calculator(){
    let [num1, setdegree1] = useState(0);
    let [val, setdegree] = useState("Value");
    function num(e){
        setdegree1(e.target.value);
    }
    function forsin(){
        val = Math.sin(num1);
        setdegree(val);
    }
    function forcos(){
        val = Math.cos(num1);
        setdegree(val);
    }
    function fortan(){
        val = Math.tan(num1);
        setdegree(val);
    }
    return(
        <div className="Calculator">
            <h2>Degree Values</h2>
            <input type="number" name="num" onChange={num} placeholder="Enter Degree"/>
            <button onClick={forsin}>Sin</button>
            <button onClick={forcos}>Cos</button>
            <button onClick={fortan}>Tan</button>
            <h1>{val}</h1>
        </div>
    );
}
export default Calculator;