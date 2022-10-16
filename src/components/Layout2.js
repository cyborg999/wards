import { Outlet } from "react-router-dom";

import "./../css/styles.css";
function Layout2() {
    return (
        <main>
            <header>
                <h1>Wards</h1>
            </header>
            <section className="sec1">
                <Outlet />
            </section>
        </main>
    )
}

export default Layout2;