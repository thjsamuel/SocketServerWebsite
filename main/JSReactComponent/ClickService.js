
function ClickService(props) {

    return (
        <div className="click_container">
            <a className="show_txt" href="#" onClick={props.handleClick}>
                <img className="show_img" src={props.target} alt={props.altTxt} />
            </a>
            <span id={"svc_txt"+props.position} className="svc_des">{props.serviceName}
            </span>
        </div>
    );
}

export default { ClickService };