import { redirect, useNavigate } from "react-router-dom";

function Dashboard(props) {
    const navigate = useNavigate();
    let user = sessionStorage.getItem("user")

    // if(user == undefined){
    //     redirect("/")
    // }
    console.log("dash")
    return (
        <div className="dashboard">
            <h1>Dashboard page</h1>
        </div>
    )
}

export default Dashboard;