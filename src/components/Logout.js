import { useNavigate } from "react-router-dom";


function Logout(props) {
    const navigate = useNavigate();
    const handleLogout = e => {
        e.preventDefault();

        localStorage.clear();
        sessionStorage.clear();
        
        navigate("/")
    }

    return (
        <a href="" className="logout" onClick={ handleLogout }></a>
    )
}

export default Logout;