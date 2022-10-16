import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import "./../css/home.css";


function Home(){
    const main = useRef();
    const tablet = useRef();
    const slogan = useRef();
    const bg2 = useRef();
    const bg3 = useRef();
    const bg4 = useRef();
    const bg5 = useRef();
    const bg6 = useRef();
    const detector = useRef();
    const obj = useRef();
    const camera = useRef();
    
    const [offset, setOffset] = useState(0);
    const [baseHeight, setBaseHeight] = useState(0);
    const [sloganLeft, setSloganLeft] = useState(0);
    const [tabletTop, settabletTop] = useState(0);
    const [bg2Top, setbg2Top] = useState(0);
    const [bg3Top, setbg3Top] = useState(0);
    const [bg4Top, setbg4Top] = useState(0);
    const [bg5Top, setbg5Top] = useState(0);
    const [bg6Top, setbg6Top] = useState(0);
    const [bg5Left, setbg5Left] = useState(0);


    const [menu, setMenu] = useState(false);

    function handleClick(){
        setMenu(!menu);

        console.log(menu)
    }

    useEffect(() => {
        // clean up code
        const baseHeightv = parseInt(getComputedStyle(main.current).height);
        const sloganLeftv = parseInt(getComputedStyle(slogan.current).left);
        const tabletTopv = parseInt(getComputedStyle(tablet.current).top);
        const bg2Topv = parseInt(getComputedStyle(bg2.current).top);
        const bg3Topv = parseInt(getComputedStyle(bg3.current).top);
        const bg4Topv = parseInt(getComputedStyle(bg4.current).top);
        const bg5Topv = parseInt(getComputedStyle(bg5.current).top);
        const bg6Topv = parseInt(getComputedStyle(bg6.current).top);
        const bg5Leftv = parseInt(getComputedStyle(bg5.current).right);

        setBaseHeight(baseHeightv);
        setSloganLeft(sloganLeftv);
        settabletTop(tabletTopv);
        setbg2Top(bg2Topv);
        setbg3Top(bg3Topv);
        setbg4Top(bg4Topv);
        setbg5Top(bg5Topv);
        setbg6Top(bg6Topv);
        setbg5Left(bg5Leftv);


        const onScroll = () => {
            setOffset(window.pageYOffset)
            console.log("scrolling", window.pageYOffset, sloganLeftv)

            animateLeft(slogan.current, window.pageYOffset, sloganLeftv, baseHeightv);
            animateTop(tablet.current, window.pageYOffset, tabletTopv, baseHeightv)
            animateTop(bg2.current, window.pageYOffset, bg2Top,baseHeightv)
            animateTop(bg3.current, window.pageYOffset, bg3Top-20, baseHeightv)
            animateTop(bg4.current, window.pageYOffset, bg4Top, baseHeightv)

            animateSlides(bg5.current, window.pageYOffset, bg5Top, bg5Leftv, baseHeightv)


        };

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });


        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    function animateSlides(target, y, top, left, baseHeight){
        left = Math.abs(left);
        let percentageHeight = y/baseHeight;
        let newTop = 100 - (percentageHeight * 105)
        target.style.top = newTop  + "%"


        let newRight = (percentageHeight * left);
        let test = ((newRight-left)/left) *100;
        target.style.right = (test + 15)+"%";

        if(percentageHeight > .92){
            detector.current.classList.remove("hidden")
        } else {
            console.log("remove")
            detector.current.classList.add("hidden")
        }
        console.log(percentageHeight, left, test)
    }

    function animateTop(target, y, top, baseHeight){
        console.log("top", top)
        let percentageHeight = y/baseHeight;
        percentageHeight = percentageHeight >= .5 ? .5 : percentageHeight
        let addedLeft = top * (percentageHeight *2);
        let newLeft = top-addedLeft;
        newLeft = newLeft + "px";
        target.style.top = newLeft;

        console.log(addedLeft, newLeft)
    }

    function animateLeft(target, x, top, baseHeight){
        let percentageHeight = x/baseHeight;
        let addedLeft = top * (percentageHeight *4);
        let newLeft = top-addedLeft;
        newLeft = newLeft + "px"
        target.style.left = newLeft 

        if(percentageHeight > .92){
            obj.current.classList.add("active")
            camera.current.classList.add("active")
        } else {
            obj.current.classList.remove("active")
            camera.current.classList.remove("active")
        }
    }

    return (
        <main  id="wards" ref={ main }>
            <section className="sec1">
                <article className="container" id="sec1">
                    <h1>Wards</h1>
                    <h2 id="slogan" ref={ slogan }>Real-Time <span id="object" ref={ obj } >Object</span> Detection <span id="camera"  ref={ camera } >Camera</span></h2>
                    <ul className="menu">
                        <li>    
                            <figure className={ menu ? "closeMenu" : "burger" } onClick={ handleClick }></figure>
                            <ol className={ menu ? "" : "hidden" }>
                                <li><Link to="/login">login</Link></li>
                                <li><Link to="/register">signup</Link></li>
                            </ol>
                        </li>
                    </ul>
                    <div id="tablet" ref={ tablet }>
                        <div className="cord"></div>
                        <div className="bg1 bg"></div>
                        <div className="bg2 slide bg" ref={ bg2 } id="bg2"></div>
                        <div className="bg3 slide bg"  ref={ bg3 } id="bg3"></div>
                        <div className="bg4 slide bg" ref={ bg4 }  id="bg4"></div>
                        <div className="bg5 slide bg" ref={ bg5 }  id="bg5"></div>
                        <div className="bg6 slide bg" ref={ bg6 }  id="bg6"></div>
                        <div className="bgtop bg"></div>
                        <div className="bordered bg hidden"  ref={ detector } id="detector">
                            <label>100% Cat</label>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Home;