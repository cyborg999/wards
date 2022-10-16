import React, { useState } from "react"
import Axios from "axios";
import server from "./../config/server";
import { redirect, useNavigate, Link } from "react-router-dom";
import Errors from "./Errors";
import "./../css/styles.css";

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
                navigate("/dashboard")
            }   
        })
    }

    return (
        <main className="login">
            <header>
                <h1>Wards</h1>
            </header>
            <section className="sec1l">
                <article className="container">
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
                        <fieldset className="btnContainer">
                            <input type="submit" className="btn" value="Login"/>
                        </fieldset>
                        <fieldset>
                            <Link to="/register" className="register">Register</Link>
                        </fieldset>
                    </form>
                </article>
            </section>
        </main>
    )
}

export default Login;