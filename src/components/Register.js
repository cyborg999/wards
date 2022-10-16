import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import server from "./../config/server";
import Errors from "./Errors";

function Register(){
    let [ inputs, setInputs ] = useState({});
    let [ errors, setErrors ] = useState([]);
    let [ added, setAdded ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(server.url+"/create", inputs).then(res => {
            console.log(res)
            setErrors(res.data);
        });
    }
    
    const handleChange = (e) => {
        let { name,value } = e.target;

        setInputs({...inputs, [name]:value} )

    }
    return (
        <main className="login">
            <header>
                <h1>Wards</h1>
            </header>
            <section className="sec1l">
                <article className="container">
                    <p className={ added ? "success" : "success hidden" }>You have succesfully created an account!</p>
                    <Errors errors={ errors }/>
                    <h3>Register</h3>
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
                        <fieldset>
                            <input type="submit" className="btn" value="register"/>
                        </fieldset>
                        <fieldset>
                            <Link to="/login" className="register">Login</Link>
                        </fieldset>
                    </form>
                </article>
            </section>
        </main>

    )
}

export default Register;