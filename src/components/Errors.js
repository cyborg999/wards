function Errors(props) {
    console.log("D2", props.errors)
    return (
        <div className="errors">
            <h5>err</h5>
            {   
                (props.errors) &&  props.errors.map( (err, idx) => {
                    return (<p key={ idx } className="error">{ err }</p>)
                })
            }
        </div>
    )
}

export default Errors;