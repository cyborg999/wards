import { useState } from "react";
import Axios from "axios";
import server from "./../config/server";
import Errors from "./Errors";

function Register(){
    let [ inputs, setInputs ] = useState({});
    let [ errors, setErrors ] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post(server.url+"/create", inputs).then(res => {
            setErrors(res);
        });
    }
    
    const handleChange = (e) => {
        let { name,value } = e.target;

        setInputs({...inputs, [name]:value} )

    }
    return (
        <div className="container">
            <Errors errors={ errors }/>
            <h1>Register</h1>
            <form onSubmit={ handleSubmit }>
                <fieldset>
                    <label>Username:</label>
                    <input type="text" onChange={ handleChange } name="username"/>
                </fieldset>
                <fieldset>
                    <label>Password:</label>
                    <input type="password" onChange={ handleChange }  name="password"/>
                </fieldset>
                <fieldset>
                    <label>Retype Password:</label>
                    <input type="password" onChange={ handleChange }  name="password2"/>
                </fieldset>
                <fieldset>
                    <label>Mobile:</label>
                    <input type="text" onChange={ handleChange }  name="mobile"/>
                </fieldset>
                <fieldset>
                    <label>Email:</label>
                    <input type="text" onChange={ handleChange }  name="email"/>
                </fieldset>
                
                <input type="submit" value="register"/>
            </form>
        </div>
    )
}

export default Register;