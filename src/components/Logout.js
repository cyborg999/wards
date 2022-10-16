import { useNavigate, Link } from "react-router-dom";


function Logout(props) {
    const navigate = useNavigate();
    const handleLogout = e => {
        e.preventDefault();

        localStorage.clear();
        sessionStorage.clear();
        
        navigate("/")
    }

    return (
        <Link to="/"className="logout"></Link>
    )
}

export default Logout;