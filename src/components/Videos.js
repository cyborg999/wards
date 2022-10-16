import { useNavigate } from "react-router-dom";
import "./../css/styles.css";
import Server from "./../config/server";
import axios from "axios";

function   Settings(props) {
    let user = JSON.parse(sessionStorage.getItem("user"));
   

    return (
        <div className="videos">
            <h3>Videos</h3>

            
        </div>
    )
}

export default Settings;