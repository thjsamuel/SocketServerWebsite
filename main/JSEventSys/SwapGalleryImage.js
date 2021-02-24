
// ! Cross origin support needed, henceforth, reliance on HTTP server is neccessary!
// ! EventGen.js should be called first to access proper functions
// import { diffTouchClick } from './EventGen.js'; requires JS6 modules

let xcoord_st = null;
let curr_circle = null;

function lockOnStart(elem) {
    xcoord_st = diffTouchClick(elem).clientX;
}

function moveDir(elem) {
    if (xcoord_st || xcoord_st === 0) {
        let diff_x = diffTouchClick(elem).clientX - xcoord_st;
        let diff_sign = Math.sign(diff_x);

        let radio_btn = document.getElementsByClassName("circle_input")
        for (let i = 0; i < radio_btn.length; ++i)
        {
            if (radio_btn[i] && radio_btn[i].checked)
            {
                curr_circle = i;
            }
        }
        if (diff_sign > 0)
        {
            if (curr_circle > 0)
            {
                radio_btn[curr_circle].checked = false;
                curr_circle -= 1;
                radio_btn[curr_circle].checked = true;
            }
        }
        else if (diff_sign < 0)
        {
            if (curr_circle < 2)
            {
                radio_btn[curr_circle].checked = false;
                curr_circle += 1;
                radio_btn[curr_circle].checked = true;
            }
        }
    }
    changesGalleryImg();
    return 0;
}

function changesGalleryImg()
{
    const three_bar = document.getElementById("three_circle");
    let img_panel = document.getElementById(three_bar.dataset.prevImg);
    if (img_panel.className == "slide_block selected")
    {
        img_panel.className = "slide_block";
    }
    three_bar.dataset.prevImg = "pano_" + (curr_circle+1);
    img_panel = document.getElementById("pano_" + (curr_circle+1));
    if (img_panel.className == "slide_block")
    {
        img_panel.className = "slide_block selected";
    }
}
