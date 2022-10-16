import React from "react";
import "./../css/home.css";

class Homepage extends React.Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop;

        console.log(event.srcElement.body.scrollTop, scrollTop)
    }

    render(){
        return (
        <main  id="wards">
            <section className="sec1">
                <article className="container" id="sec1">
                    <h1>Wards</h1>
                    <h2 id="slogan">Real-Time <span id="object">Object</span> Detection <span id="camera">Camera</span></h2>
                    <ul className="menu">
                        <li>    
                            <figure className="burger"></figure>
                            <ol>
                                <li>login</li>
                                <li>signup</li>
                            </ol>
                        </li>
                    </ul>
                    <div id="tablet">
                        <div className="cord"></div>
                        <div className="bg1 bg"></div>
                        <div className="bg2 slide bg" id="bg2"></div>
                        <div className="bg3 slide bg" id="bg3"></div>
                        <div className="bg4 slide bg" id="bg4"></div>
                        <div className="bg5 slide bg" id="bg5"></div>
                        <div className="bg6 slide bg" id="bg6"></div>
                        <div className="bgtop bg"></div>
                        <div className="bordered bg hidden" id="detector">
                            <label>100% Cat</label>
                        </div>
                    </div>
                </article>
            </section>
        </main>
        )
    }
}

export default Homepage;