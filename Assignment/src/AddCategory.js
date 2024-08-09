import { useState } from "react";
import axios from "axios";
import ShowCategory from "./ShowCategory";
function AddCategory(){
    let [name,setName] = useState("");
    let [description,setDescription] = useState("");
    let [data,setData] =useState ([{name : "name", description: "description"}]);

    function nameChanged(e){
        e.preventDefault();
        setName(e.target.value);
    }
    function descriptionChanged(e){
      e.preventDefault();
      setDescription(e.target.value);
    }

    function Addcategory(){
        let newdata = {name : name, description: description};
        axios
        .post("http://localhost:3000/api/v1/categories",newdata)
        .then(function(response){
            console.log(response)
            setData(newdata);
        })
        .catch(function (err){
            console.log(err)
        })
    }


    return(
        <div className="addcategory">
            <input type="" value={name} onChange={nameChanged} placeholder=" Enter Name"></input>
            <input type="" value={description} onChange={descriptionChanged} placeholder="Enter Description"></input>
            <button onClick={Addcategory}>AddCategory</button> 

        </div>
    )
}

export default AddCategory;