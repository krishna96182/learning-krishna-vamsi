import { useState, useEffect } from "react";
import axios from "axios";
function Display(){
    let [productName, setproductName] = useState([]);
    useEffect(function(){
        console.log("function called on load");
        getProduct();
        /* axios.get("todos")
        .then(function (response){
            console.log(response.data);
            settodos(response.data);
        })
        .catch(function (error){
            console.log(error);
        }) */
    },[]);
    function getProduct(){
        axios
        .get("https://fakestoreapi.com/products")
        .then(function (response){
            console.log(response.data);
            setproductName(response.data);
        })
        .catch(function (error){
            console.log(error);
        });
    }
    return(
        <div className="Display">
            {productName.map(function(val,index){
                return <div>
                Title:{val.title}
                <div>
                Price: {val.price}
                </div>
                <div>
                Description: {val.description}
                </div>
                <div>
                Category:{val.category}
                </div>
                <div>
                Image:<img src={val.image}/>
                </div><br/>
                {/* <div>
                <b>Rating:</b> {val.rating}
                </div> */}
                </div>
                    
            })}
         </div>
    );
}
export default Display;