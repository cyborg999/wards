import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import objList from "./../config/cocossd";
import "./../css/styles.css";
import Server from "./../config/server";
import Select from 'react-select';
import axios from "axios";

function   Settings(props) {
    let obj = objList.map( (obj, idx) => {
        obj.value = obj.label;

        return obj
    });

    let user = JSON.parse(sessionStorage.getItem("user"));
    let [choice, setUserChoice ] = useState([]);
    let [ percentage, setPercentage ] = useState(0);
    let [ allowAudio, setAllowAudio ] = useState(false);
    let [ added, setAdded ] = useState(false);

    useEffect(() => {
        //get settings
        console.log("once")
        axios.post(Server.url+"/userSettings", { "id" : user.id }).then(res => {
            if(res.data.settings.length){
                setAllowAudio(res.data.settings[0].allow_audio);
                setPercentage(res.data.settings[0].percentage);
            } 

            if(res.data.tags.length){
                let tags = res.data.tags
                setUserChoice(tags);
            } 
        })
      }, []);

    const handleSubmit = e => {
        e.preventDefault();

        let data = {
            percentage : percentage
            , allow_audio : allowAudio
            , obj : choice
            , user : user.id
        }

        axios.post(Server.url+"/settings", data).then(res => {
            console.log(res);
            setAdded(true)
        })
    }

    const handleChange = e => {
        let { name, value, checked } = e.target;

        if(name == "allow_audio"){
            value = checked;
            setAllowAudio(value)
        } else {
            setPercentage(value)
        }
    }

    return (
        <div className="setting">
            <h3>Settings</h3>

            <p className={ added ? "success" : "success hidden" }>Settings updated.</p>
            <form onSubmit={ handleSubmit }>
                <Select
                    onChange={(choice) => {
                        console.log("D2")
                        setUserChoice(choice)
                    }}
                    value={choice}
                    isMulti
                    name="colors"
                    options={obj}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
                <fieldset>
                    <label>Match Percentage</label>
                    <input type="number" onChange={ handleChange } max="100" min="20" name="percentage" value={ percentage } />
                </fieldset>
                <fieldset>
                    <label>Allow Audio</label>
                    <input type="checkbox"
                    checked={ allowAudio }
                      onChange={ handleChange }  name="allow_audio" />
                </fieldset>
                <input type="submit" className="btn"/>
            </form>
        </div>
    )
}

export default Settings;