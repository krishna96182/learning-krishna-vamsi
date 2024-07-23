import { useState, useEffect } from "react";
import axios from "axios";
function Genders(){
    let [genderName, setgenderName] = useState("");
    let [displayName, setDisplayName] = useState("");
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
            <button onClick={function(){
        getGender(genderName);
    }}>Gender</button>
        </div>
    );
}
export default Genders;
