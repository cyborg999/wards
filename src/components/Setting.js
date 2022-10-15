import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import objList from "./../config/cocossd";
import "./../css/settings.css";
import Server from "./../config/server";
import Select from 'react-select';
import axios from "axios";

function   Settings(props) {
    let obj = objList.map( (obj, idx) => {
        obj.value = obj.label;

        return obj
    });

    let user = JSON.parse(sessionStorage.getItem("user"));
    let [choice, setUserChoice ] = useState({});
    let [ percentage, setPercentage ] = useState(0);
    let [ allowAudio, setAllowAudio ] = useState(false);
    console.log(obj)
    let initialVal = [];
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
                // tags.map( tag => {
                //     console.log(tag)
                //     // values.push(["label":])
                // })
                console.log(tags);
                // setUserChoice(test);
                let test = [
                    {name: '/m/01g317', id: 1, label: 'person', value: 'person'}
                    , {name: '/m/0199g', id: 2, label: 'bicycle', value: 'bicycle'}
                    , {id: 9, userid: 4, tagname: 'car', label: 'car', value: 'car'}
                ]
                setUserChoice(test);

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
            <h1>Settings</h1>
            <label>List of Objects</label>

            <form onSubmit={ handleSubmit }>
                <Select
                    onChange={(choice) => {
                        console.log("D2")
                        setUserChoice(choice)
                    }}
                    defaultValue={choice}
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
                <input type="submit"/>
            </form>
            

            
        </div>
    )
}

export default Settings;