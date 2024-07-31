import logo from './logo.svg';
import './App.css';
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
    <Routes>
    <Route path='/' element={<AddCategory/>}> </Route>
      <Route path="/show" element={<ShowCategory/>}> </Route>
     {/* <Route path='/categories/:id' element={<CategoryDetails/>}> </Route> */}
    </Routes>
    </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
