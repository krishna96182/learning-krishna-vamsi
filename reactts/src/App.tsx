// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Home from './Home';
// function App() {
//   return (
//     <div className="App">
//       <Home />
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Home from "./Home";
import Todo from "./Todo";
import Counter from "./Counter";
import ParamExample from "./ParamExample";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <div className="app-name">My App</div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/counter">Counter</Link>
          </li>
          <li>
            <Link to="/param/123">Param Example</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/param/:id" element={<ParamExample />} />
      </Routes>
    </Router>
  );
};

export default App;


