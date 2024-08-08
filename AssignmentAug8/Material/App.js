// import './App.css';
// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import Cities from './Cities';
// import CityDetails from './CityDetails';
// import CityNews from './CityNews';
// import RefHookExample from './RefHookExample';
// import ClassBasedCounter from './ClassBasedCounter';
// import ClassBasedCounterForm from './ClassBasedCounterForm';
// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<RefHookExample />} />
//           <Route path="/Counter" element={<ClassBasedCounter />} />
//           <Route path="/CounterForm" element={<ClassBasedCounterForm />} />
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

// export default App;


import React from 'react';
// import Button from '@mui/material/Button';
import Material from './Matrial';
import Typograph from './Typograph';
import GridLayout from './GridLayout';
import Theme from './Theme';


function App() {

return (
<div>
<Material/>
{/* <Typograph/>
<GridLayout/>
<Theme/>
ReactDOM.render(
<React.StrictMode>
<Theme />
</React.StrictMode>,
document.getElementById('root')
); */}
</div>
);
}
export default App;
