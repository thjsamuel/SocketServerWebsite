//  https://css-tricks.com/simple-swipe-with-vanilla-javascript/
function addElemEvent(elem, dom_event_name, call_func) // add an event to my element
{
    elem.addEventListener(dom_event_name, call_func, false);
}

function diffTouchClick(elem) // if is touchevent, changed touches returned or we just return the elem
{
    return elem.changedTouches ? elem.changedTouches[0] : elem;
}