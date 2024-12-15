
import Form from './Form';
import Home from './Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
  } from "react-router-dom";
import Textfield from './Textfield';


function App() {
  
return (
  <>
  <Textfield/>
<Router>
<div className="App">
<>
<Routes>
<Route path='/login' element={<Form title="Login" />} />
<Route path='/register' element={<Form title="Register"

/>} />
<Route
path='/home'
element={
<Home />}
/>

</Routes>
</>
</div>
</Router>
</>
);
}

export default App;