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
        <div className="image">
            {productName.map(function(val,index){
                return <div>
                <b>Title:</b>{val.title}
                <div>
                <b>Price:</b> {val.price}
                </div>
                <div>
                <b>Description:</b> {val.description}
                </div>
                <div>
                <b>Category:</b>{val.category}
                </div>
                <div>
                <b>Image:</b> <img src={val.image}/>
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