import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import StartPage from './StartPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Router>
          <Routes>
              <Route exact path="/home" element={<Home/>}/>
              <Route exact path="/profile" element={<Profile/>}/>
              <Route exact path="/" element={<StartPage/>}/>
             {/* <Route exact path="/" element={<LoginPage/>}/>
              <Route exact path="/register" element={<Register/>}/>
              <Route exact path="/profile" element={<Profile/>}/> */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
