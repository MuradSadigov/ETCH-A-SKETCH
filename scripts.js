const color = document.querySelector("#ColorPicker");
const clear_btn = document.querySelector("#screenCleanerButton");
const eraser_btn = document.querySelector("#screenEraserButton");
const range = document.querySelector("#range");
const scale = document.querySelector("#scale");
const sketch = document.querySelector("#sketch");
const pen = document.querySelector(".grid-item");
const rainbow_btn = document.querySelector("#rainbowButton");
const color_btn = document.querySelector("#color_button");

const DEFAULT_MODE = "color";
const DEFAULT_COLOR = 'black';
const DEFAULT_SIZE = 8;

let mouseDown = false;
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

color.addEventListener("input", setColor);
scale.addEventListener("change", setSize);
clear_btn.addEventListener("click", screenCleaner);
rainbow_btn.addEventListener("click", changeMode1);
color_btn.addEventListener("click", changeMode2);
eraser_btn.addEventListener("click", changeMode3);

function changeMode1()
{
    currentMode = "rainbow";
}

function changeMode2()
{
    currentMode = "color";
}

function changeMode3()
{
    currentMode = "eraser";
}

window.addEventListener('mousedown', () => {
    mouseDown = true;
})
window.addEventListener('mouseup', () => {
    mouseDown = false;
})

function changeColor(e)//
{   
    if(mouseDown)
    {
        if(currentMode === "rainbow")
        {
            let first = Math.floor(Math.random() * 255);
            let second = Math.floor(Math.random() * 255);
            let third = Math.floor(Math.random() * 255);
            currentColor =  `rgb(${first},${second},${third})`;
        }
        else if(currentMode === "color")
        {
            currentColor = color.value;
        }
        else if(currentMode === "eraser")
        {
            currentColor = "white";
        }
        e.target.style.backgroundColor = currentColor;
    }
}

function setColor(){//
    currentColor = color.value;
}

function setSize(){//

    currentSize = scale.value;
    rangeValues();
    removeGrid();
    setupGrid();
}

function rangeValues(){//
    range.innerHTML = `${scale.value} x ${scale.value}`;
}

function setupGrid()//
{
    sketch.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    sketch.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`

    for (let i = 0; i < currentSize**2; i++)
    {
        const div = document.createElement("div");
        div.setAttribute("class", "grid-item");
        div.addEventListener('mouseover', changeColor);
        div.addEventListener('mousedown', changeColor);
        sketch.appendChild(div);
    }
}

function screenCleaner()
{
    removeGrid();
    setupGrid();
}

function removeGrid()//
{
    sketch.innerHTML = '';
}

window.onload = () => {//
    setupGrid();
}