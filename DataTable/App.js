import logo from './logo.svg';
import React, { Suspense, lazy } from "react";
// import './App.css';
import Menu from './Menu';
import Login from './Login';
import Footer from './Footer';
import Container from './Container'
import Counter from './Counter';
import Todo from './Todo';
import Addtwo from './Addtwo'
import Hobby from './Hobby';
import Calculator from './Calculator';
import Student from './Student';
import Gender from './Genders';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Display from './Display';
import AddCategory from './AddCategory';
import ShowCategory from './ShowCategory';
import AddUsers from './AddUsers';
import ShowUsers from './ShowUsers';
import Navbar from './Navbar';
import ShowProducts from './ShowProducts';
// import AdminPage from './AdminPage';
// import OrderDetails from './OrderDetails';
import CategoryList from './CategoryList';
import CategoryDetail from './CategoryDetail';
import CategoryForm from './CategoryForm';
import CategoryEdit from './CategoryEdit';
// import AddProducts from './AddProducts';

const AdminPage = lazy(() => import("./AdminPage"));
const OrderDetails = lazy(() => import("./OrderDetails"));

function App() {
  return (
    <div className="App">
      <header>
        {/* <Hobby/>
        <Addtwo/>
        <Calculator/>
        <Student/> */}
        {/* <h1>Main Page</h1>
        <BrowserRouter>
        <Link to="/todo">Todo</Link>
        <Link to="/login/Lets login/123">Login</Link>
        <br/>
        <Routes>
          <Route path="/todo" element={<Todo/>}/>
          <Route path="/login/:title/:tokenId" element={<Login/>}/>
        </Routes>
        </BrowserRouter> */}
        {/* <Gender/>
        <Display/> */}
        
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route path="/products" element={<ShowProducts/>}>
            <Route path=":id" element={<ShowProducts />} />
          </Route>
          <Route path="/show" element={<ShowUsers/>}>
            <Route path=":userId" element={<ShowUsers />} />
          </Route>
          <Route path="/order" element={<AdminPage/>}>
            <Route path=":orderId" element={<OrderDetails />} />
          </Route>
          <Route path="/admin" element={<CategoryList />} />
          <Route path="/add" element={<CategoryForm />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/view/:id" element={<CategoryDetail />} />
          <Route path="/edit/:id" element={<CategoryForm />} />
{/*           <Route path="/Orders" element={}/>
          <Route path="/Category" element={}/> */}
          </Routes>
        
    </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
