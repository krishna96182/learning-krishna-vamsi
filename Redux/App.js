// import logo from './logo.svg';
// import './App.css';
// import Menu from './Menu';
// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import Cities from './Cities';
// import CityDetails from './CityDetails';
// import CityNews from './CityNews';
// import RefHookExample from './RefHookExample';
// import ClassBasedCounter from './ClassBasedCounter';
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';

// const LOGIN_URL = "https://ascendion.com/login";
// let menuData = [
//   { title: "Home", path: "/" },
//   { title: "About", path: "/about" },
//   { title: "Contact", path: "/contact" },
// ];
// let login_attempts = 5;
// let error_msgs = { error: "sry", error_500: "server error" };
// function greet() {
//   alert("hi you are logged in");
// }

// function App() {
//   let [show,setShow]=useState(true);
//   return (
//     <div className="App">
//       show var = {show} <br/>
//       <select onChange={(e)=>{
//         e.target.value=="show" ? setShow(true) : setShow(false);
//       }}
//       >
//         <option value="show">Show</option>
//         <option value="hide">Hide</option>
//       </select>
//       <BrowserRouter>
//       {show ? <Menu menuData={menuData}/>:""}
//         <Routes>
//           <Route path="classBased" element={<ClassBasedCounter />} />
//           <Route path="/refHook" element={<RefHookExample />} ></Route>
//           <Route path="/cities" element={<Cities />} >
//           <Route path=":name/" element={<CityDetails />} >
//           <Route path="news" element={<CityNews />} />
//           </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

/*function App(){
  return (
    <>
    <MUIspacing/>
    <AutoGrid/>
    <BasicGrid/>
    <ComplexFluidGrid/>
    <FeaturedPost/>
    <MainFeaturedPost/>
    <NestedGridGroup/>
    </>
  )
}*/



// import React, { useState } from 'react';
// import Login from './Login';
// import Menu from './Menu';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <div className="container">
//       <Menu isLoggedIn={isLoggedIn} />
//       <Login onLogin={handleLogin} onLogout={handleLogout} isLoggedIn={isLoggedIn} />
//     </div>
//   );
// };


import './App.css';
import CountReducer from './reducers/CountReducer';
import ReduxCounter from './ReduxCounter/ReduxCounter';
import ReduxTodo from './ReduxCounter/ReduxTodo';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to='/CountReducers'>Count</Link>
                <Link to='/ReduxCounter'>Counter</Link>
                <Link to='/ReduxTodo'>Todo</Link>
            </nav>
            <Routes>
                <Route path='/CountReducers' element={<CountReducer />} />
                <Route path='/ReduxCounter' element={<ReduxCounter />} />
                <Route path='/ReduxTodo' element={<ReduxTodo />}>
                </Route>
            </Routes>
        </BrowserRouter>
    ); 
}

export default App;
