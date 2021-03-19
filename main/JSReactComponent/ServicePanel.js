'use strict';

// create raw panel component
function ShowPanel(props) {
    const contain_display = (
        <div className="svc_panel">
            <div className="displayPanel">
                <h2>service name</h2>
                <button className="close_btn btn_neu" type="button">X</button>
                <div className="sliding_gallery">
                    <img id="img_display" alt="svc_image" src="https://storage.googleapis.com/blurqer/creative_works/20130824_103432.jpg" />
                    <nav id="svc_nav">
                        <ul id="svc_circle" data-prev-img="svc_img_1">
                            <li>
                                <input id="svc_circle1" className="svc_circles" type="radio" data-img-panel="svc_img_1" defaultChecked="" />
                                <label className="circle" htmlFor="svc_circle1"></label>
                            </li>
                            <li>
                                <input id="svc_circle2" className="svc_circles" type="radio" data-img-panel="svc_img_2"  />
                                <label className="circle" htmlFor="svc_circle2"></label>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="scrollable_panel">
                    <div id="txtbox">
                        <h2>Description</h2>
                        <div id="innerptxt">
                            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    return contain_display;
}

class TogglePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { toggled: false };
        this.toggleOn = this.toggleOn.bind(this);
    }

    toggleOn() {
        this.setState( 
            (state) => {
                toggled: !state.toggled;
            }
        );
    }

    render() {
        //if (this.state.toggled) {
        return React.createElement(ShowPanel, { serviceName: this.props.serviceName }, null)
        //}
    }
}

//const elem = createE(, null) //createE(LikeButton); // create element and pass prop Like Button of type component
// const domContainer = document.querySelector('#container_svcpanel');
// ReactDOM.render(<CreateRawPanel />, domContainer); // create element of type 
// once component is created, not needed to render React's DOM here

export default { TogglePanel };