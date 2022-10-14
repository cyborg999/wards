import { useState } from "react"
import Axios from "axios";
import server from "./../config/server";

function Login(){
    let [inputs, setInput] = useState({});

    const handleChange = (e) => {
        let { name, value } = e.target;

        setInput({ ...inputs, [name] : value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post(server.url+"/login", inputs).then(res => {
            console.log(res.data.length)
        })
    }

    return (
        <div className="login">
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