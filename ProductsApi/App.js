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


// import './App.css';
// // import CountReducer from './reducers/CountReducer';
// // import ReduxCounter from './ReduxCounter/ReduxCounter';
// // import ReduxTodo from './ReduxCounter/ReduxTodo';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import React from "react";
// // import EditTodo from './ReduxCounter/EditTodo';
// // import UseMemoHookExample from './UseMemoHookExample';
// // import CustomHookUser from './CustomHookUser';
// // import Profile from './Profile';
// import Todo from './Todo';
// import JwtDecode from './JwtDecode';
// import LazyHome from './LazyHome';
// import HeaderBar from './HeaderBar';
// import UseMemoHookExample from './UseMemoHookExample';
// import Notifications from './NotificationContext';
// import ReactDOM from "react-dom";
// // function App() {
// //     return (
// //         <BrowserRouter>
// //             <nav>
// //                 <Link to='/CountReducers'>Count</Link>
// //                 <Link to='/ReduxCounter'>Counter</Link>
// //                 <Link to='/ReduxTodo'>Todo</Link>
// //             </nav>
// //             <Routes>
// //                 <Route path='/CountReducers' element={<CountReducer />} />
// //                 <Route path='/ReduxCounter' element={<ReduxCounter />} />
// //                 <Route path='/ReduxTodo' element={<ReduxTodo />}>
// //                 <Route path='/usememo' element={<UseMemoHookExample />}/>
// //               </Route
// //                     path="/edit/:index"
// //                     element={<EditTodo todos={todos} />}
// //                 />
// //                 </Route>
// //             </Routes>
// //         </BrowserRouter>
// //     ); 
// // }

// // export default App;
// // const NumberContext = React.createContext();
// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 {/* <Route path="/*" element={<ReduxTodo />} />
//                 <Route path='/EditTodo' element={<EditTodo />}/>
//                 <Route path='/usememo' element={<UseMemoHookExample />}/>
//                 <Route path='/CustomHook' element={<CustomHookUser />}/>
//                 <Route path='/profile' element={<Profile />}/> */}
//                 {/* <Route path='/todo' element={<Todo />}/> */}
//                 {/* <Route path='/jwt' element={<JwtDecode />}/>
//                 <Route path='/lazy' element={<LazyHome />}/> */}
//                 {/* <Route path='/bar' element={<HeaderBar />}/> */}
//                 <Route path='/memo' element={<UseMemoHookExample />}/>
//                 <Route path='/bar' element={<HeaderBar />}/>

//             </Routes>
//         </BrowserRouter>
//     );
   
// }
// export default App;

// src/App.jsx
// import Task from './components/Task';
// import TaskList from './components/TaskList';

// function App() {
//   return (
//     <div className="App">
//       <Task />
//       <TaskList />
//     </div>
//   );
// }

// export default App;


// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import Todo from "./Todo";
// import TodoDetails from './TodoDetails';
// import TodoDetailsEdit from './TodoDetailsEdit';

// function App() {
//   return (
//       <BrowserRouter>
//           <Routes>
//               <Route path="/todos" element={<Todo />} />
//               <Route path="/todos/:id" element={<TodoDetails />} />
//               <Route path="/todos/:id/edit" element={<TodoDetailsEdit />} />
//           </Routes>
//       </BrowserRouter>
//   );
// }
// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import ProductList from './products/ProductList';
import ProductForm from './products/ProductForm';
import ProductSearch from './products/ProductSearch';
import ProductDetails from './products/ProductDetails';

function App() {
    return (
        <Router>
            <AppBar 
                position="static" 
                sx={{ backgroundColor: '#2C3E50' }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button color="inherit" component={Link} to="/" sx={{ color: '#ECF0F1', mr: 2 }}>
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/product/add" sx={{ color: '#ECF0F1', mr: 2 }}>
                        Add Product
                    </Button>
                    <Button color="inherit" component={Link} to="/search" sx={{ color: '#ECF0F1' }}>
                        Search Products
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/add" element={<ProductForm />} />
                    <Route path="/product/edit/:id" element={<ProductForm />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/search" element={<ProductSearch />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
