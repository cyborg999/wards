import React, { useState } from "react"
import Axios from "axios";
import server from "./../config/server";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";

function Login(props){
    let [inputs, setInput] = useState({});
    let [ errors, setErrors ] = useState([]);
    let self = this;
    const navigate = useNavigate();
    const handleChange = (e) => {
        let { name, value } = e.target;

        setInput({ ...inputs, [name] : value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post(server.url+"/login", inputs).then(res => {
            setErrors(res.data.errors);

            if(res.data.errors.length == 0){
                sessionStorage.setItem("user", JSON.stringify(res.data.details[0]))
                navigate("/settings")
            }   
        })
    }

    return (
        <div className="login">
            <Errors errors={ errors }/>
            <form onSubmit={ handleSubmit }>
                <fieldset>
                    <label>Username: </label>
                    <input type="text" onChange={ handleChange } name="username"/>
                </fieldset>
                <fieldset>
                    <label>Password: </label>
                    <input type="password" onChange={ handleChange }  name="password"/>
                </fieldset>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default Login;