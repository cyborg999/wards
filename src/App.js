import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Video from "./components/Video";
import Logout from "./components/Logout";
import Settings from "./components/Setting";
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
        <main className="wards">
          <section className="sec0">
              <article className="container">
                  <figure className="logo"></figure>
                  <h1>Wards</h1>
                  <ul>
                  { user!=null  ? (
                    <>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/video">Video</Link></li>
                    </> 
                  ) : (
                    <>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/register">Register</Link></li>
                      <li><Link to="/settings">Settings</Link></li>
                    </>
                  )}
                  </ul>
                  <Logout />
              </article>
          </section>
          <section className="sec1">
            <article className="container">
              
                {/* content */}
                <Routes>
                  <Route exact path='/dashboard' element={<Dashboard user={ user }/>}></Route>
                  <Route exact path='/video' element={<Video/>}></Route>
                  <Route exact path='/' element={<Home/>}></Route>
                  <Route exact path='/login' element={<Login/>}></Route>
                  <Route exact path='/register' element={<Register/>}></Route>
                  <Route exact path='/settings' element={<Settings />}></Route>
                </Routes>
            </article>
        </section>
        </main>
      </Router>
    )
  }
}

export default App;