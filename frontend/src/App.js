import Register from '../src/pages/Register'
import Login from '../src/pages/Login'
import Home from '../src/pages/Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
