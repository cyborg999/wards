function Errors(props) {
    return (
        <div className="errors">
            {   
                (props.errors) &&  props.errors.map( (err, idx) => {
                    return (<p key={ idx } className="error">{ err }</p>)
                })
            }
        </div>
    )
}

export default Errors;