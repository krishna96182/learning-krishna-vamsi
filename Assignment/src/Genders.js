import { useState, useEffect } from "react";
import axios from "axios";
function Genders(){
    let [genderName, setgenderName] = useState("");
    let [displayName, setDisplayName] = useState("");
    useEffect(function(){
        console.log("function called on load");
        getGender();
        /* axios.get("todos")
        .then(function (response){
            console.log(response.data);
            settodos(response.data);
        })
        .catch(function (error){
            console.log(error);
        }) */
    },[]);
    function genderTodoEntered(e){
        setgenderName(e.target.value);
    }
    function getGender(){
        let url = "https://api.genderize.io/?name=Maneesh"+genderName
        axios
        .get(url)
        .then(function (response){
            console.log(response.data);
            setDisplayName(response.data);
        })
        .catch(function (error){
            console.log(error);
        });
    }
    return(
        <div>
            <input type="text" name="todoitem" value={genderName} onChange={genderTodoEntered}/>
            <button onClick={getGender}>Gender</button>
        </div>
    );
}
export default Genders;