import { default as ClickUX } from "./JSReactComponent/ClickService.js";
import { default as PopupUX } from "./JSReactComponent/ServicePanel.js"

let render_targets = document.getElementsByClassName("svc_tabs")
const link = "../assets/reno-images/reno";
const ServiceName = {
    SVC_1: "Plastering",
    SVC_2: "Tile Laying",
    SVC_3: "Glass Installation",
    SVC_4: "Wallpaper Installation"
}

function preventRedirect(e) {
    e.preventDefault();
}

function activatePopup(obj) {
    const display_component = React.createElement(PopupUX.TogglePanel, { serviceName: obj.serviceName, elem:obj.container }, obj.container);
    ReactDOM.render(display_component, obj.container);
    console.log('service was clicked.');
}

for (let i = 1; i <= render_targets.length; ++i)
{
    let displayE = document.getElementById("svc" + i);
    let displayTxt = ServiceName["SVC_" + i];
    let info_obj = {
        serviceName: displayTxt,
        serviceIndex: i,
        container: document.querySelector('#container_svcpanel')
    }

    //const display_component = <ClickImage target={link + i + ".PNG"} altTxt={"pano"+i}/>
    const display_component = React.createElement(ClickUX.ClickService,
        { target:link + i + ".PNG", altTxt:"pano"+i, serviceName:displayTxt, position:i,
        handleClick: (e) => { preventRedirect(e) ; activatePopup(info_obj) } }, null)
    ReactDOM.render(display_component, displayE);
}