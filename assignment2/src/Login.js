import { useParams } from "react-router-dom";
function Login(){
    let params = useParams();
    console.log(params);
    function doLogin(){
        alert("Wow, i can login also");
    }
    return (
        <div className="Login">
            <h1>{params.title}</h1>
            <h2>Token={params.tokenId}</h2>
            <input type="text" name="username" />
            <input type="password" name="password" />
            <button onClick={doLogin}>Login Now!</button>
        </div>
    )
}
export default Login;