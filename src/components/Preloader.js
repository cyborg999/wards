const preloader = (props) => {
    let cs = props.preloader ? "preloader" : "preloader hidden";
    return (
        <div className={ cs }>
            <figure className="fig_preloader"></figure>
        </div>
    )
}

export default preloader;