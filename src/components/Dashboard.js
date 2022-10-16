import { redirect, useNavigate, Outlet, Link } from "react-router-dom";

function Dashboard(props) {
    const navigate = useNavigate();
    let user = sessionStorage.getItem("user")

    // if(user == undefined){
    //     redirect("/")
    // }
    console.log("dash")
    return (
        <main className="dashboard">
            <header className="mainHeader">
                <article className="container">
                    <h1>Wards</h1>
                    <Link to="logout" className="logout"></Link>
                </article>
            </header>
            <section className="main_sec1">
                <article className="container">
                    <div className="sec_controls">
                        <ul className="sec1_nav">
                            <li><a href="" className="home"></a></li>
                            <li><a href="" className="live"></a></li>
                            <li><a href="" className="list"></a></li>
                            <li><Link to="settings" className="setting"></Link></li>
                        </ul>
                        <a href="" className="profile"></a>
                    </div>
                    <div className="sec_content">
                        <Outlet />
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Dashboard;