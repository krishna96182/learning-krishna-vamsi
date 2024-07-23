import {useState} from "react";
function Counter(){
    console.log(useState(1))
    let [stateCount, setStateCount] = useState(2);
    function increase(){
        setStateCount(stateCount+1);
    }
    function decrease(){
        setStateCount(stateCount-1)
    }
    function resetCount(){
        setStateCount(stateCount=0)
    }
    return(
        <div>
            <h1>{stateCount}</h1>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
            <button onClick={resetCount}>ResetCount</button>
        </div>
    );
}
export default Counter;