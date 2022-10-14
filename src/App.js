import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import "./css/style.css";

class App extends React.Component {
  render(){
    return (
      <div className="container">
        <Register />
        <Login />
      </div>
    )
  }
}

export default App;