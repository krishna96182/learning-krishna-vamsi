import { useState, useEffect } from "react";
import axios from "axios";
function Gitdata(){
    let [gitId, setgitId] = useState("");
    let [displayId, setDisplayId] = useState("");
    function gitTodoEntered(e){
        setgitId(e.target.value);
    }
    function getGit(gitId){
        let url = "https://api.github.com/users/"+gitId
        axios
        .get(url)
        .then(function (response){
            console.log(response.data);
            setDisplayId(response.data);
        })
        .catch(function (error){
            console.log(error);
        });
    }
    return(
        <div className="gitdata">
            <input type="text" name="todoitem" value={gitId} onChange={gitTodoEntered}/>
            <button onClick={function(){
                getGit(gitId);
            }}>Show</button>
            <p>{displayId.id}</p>
            <img src={displayId.avatar_url}/>
        </div>
    );
}
export default Gitdata;