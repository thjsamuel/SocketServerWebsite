import { default as ClickUX } from "./JSReactComponent/ClickService.js";
import { default as PopupUX } from "./JSReactComponent/ServicePanel.js"

const Link = "../assets/reno-images/reno";
const ServiceName = {
    SVC_1: "Plastering",
    SVC_2: "Tile Laying",
    SVC_3: "Glass Installation",
    SVC_4: "Wallpaper Installation"
}
let render_targets = document.getElementsByClassName("svc_tabs");

function preventRedirect(e) {
    e.preventDefault();
}

function activatePopup(obj) {
    const display_component = React.createElement(PopupUX.TogglePanel, { serviceName: obj.serviceName }, null);
    // the equivalentof above is <PopupUX.TogglePanel serviceName="obj.serviceName"/>
    ReactDOM.render(display_component, obj.container);
    console.log('service was clicked.');
}

function testGitHistory(obj) {
    const display_component = React.createElement(PopupUX.TogglePanel, { serviceName: obj.serviceName }, null);
    // the equivalentof above is <PopupUX.TogglePanel serviceName="obj.serviceName"/>
    ReactDOM.render(display_component, obj.container);
    console.log('service was clicked.');
}

function testGitHistory2(obj) {
    const display_component = React.createElement(PopupUX.TogglePanel, { serviceName: obj.serviceName }, null);
    // the equivalentof above is <PopupUX.TogglePanel serviceName="obj.serviceName"/>
    ReactDOM.render(display_component, obj.container);
    console.log('service was clicked.');
}

for (let i = 1; i <= render_targets.length; ++i)
{
    let displayE = document.getElementById("svc" + i);
    let displayTxt = ServiceName["SVC_" + i]; // this is the identification of the service
    let info_obj = { // object served to ux component
        serviceName: displayTxt,
        serviceIndex: i, // this is the identification number of the service
        container: document.querySelector('#container_svcpanel')
    }

    //const display_component = <ClickImage target={link + i + ".PNG"} altTxt={"pano"+i}/>
    const display_component = React.createElement(ClickUX.ClickService,
        { target:Link + i + ".PNG", altTxt:"pano"+i, serviceName:displayTxt, position:i,
        handleClick: (e) => { preventRedirect(e) ; activatePopup(info_obj) } }, null)
    ReactDOM.render(display_component, displayE);
}