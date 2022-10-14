import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import "./css/style.css";

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user : null
    }
  }

  render(){
    let { user }  = this.state;
    return (
      <Router>
        <div className="MyWebsite">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
         
        </div>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
          <Route exact path='/dashboard' element={<Dashboard user={ user }/>}></Route>
        </Routes>
      </Router>
    )
  }
}

export default App;