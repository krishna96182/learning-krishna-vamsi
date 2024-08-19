import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ShowCategory() {
const [getCategory, setCategory] = useState([]);
const [Value,setValue]=useState("");
const navigate = useNavigate();

function displayCategory() {
const url = "http://localhost:3000/api/v1/categories";
axios.get(url)
.then(function (response) {
setCategory(response.data.categories);
setValue(response.data.categories._Value);
})
.catch(function (error) {
alert("Server is not responding",error);
});
}

function deletegetCategory(Value){
    axios.delete(`http://localhost:3000/api/v1/categories/${Value}`)
            .then(function(response)
            {
                console.log(response);
                displayCategory();
            })
            .catch(function(error)
            {
                console.log(error);
            });
        let newValues=getCategory.filter(function (i)
        {
            if(Value == i)
            {
                return false;
            }
            else
            {
                return true;
            }
        });
    setCategory(newValues);

}

return (
<div>
<h1>Get Category Details</h1>
<button onClick={displayCategory}>Show Category</button><br/><br/>
<div className='inner'>
{getCategory.map(function (value) {
return (
<div>
<p><b>Name:</b> {value.name}</p>
<p><b>Description:</b> {value.description}</p>
<button onClick={() => deletegetCategory(value._id)}>Delete</button>
</div>
);
})}
</div>
</div>
);
}

export default ShowCategory;