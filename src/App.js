import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Video from "./components/Video";
import Logout from "./components/Logout";
import Settings from "./components/Setting";
import NotFound from "./components/NotFound";
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
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="NotFound" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    )
  }
}

export default App;