let userSelectedWidth;

while (!userSelectedWidth || userSelectedWidth < 0 || userSelectedWidth > 32) {
    userSelectedWidth = prompt("Please enter the number of pixels you would like per side between 0 and 32");
}

let gridWidth = 500;

// - 2 pixels for the border on each div
let gridNodeSide = gridWidth / userSelectedWidth - 2;

const container = document.querySelector('.container');
const resetButton = document.querySelector('.reset');
const rainbowbutton = document.querySelector('.rainbow')

// tack the state of the mouse click so we can drag and draw
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

for (let i = 0; i < (userSelectedWidth * userSelectedWidth); i++) {
    let gridNode = document.createElement('div');
    gridNode.classList.add('gridNode');
    gridNode.style.width = `${gridNodeSide}px`;
    gridNode.style.height = `${gridNodeSide}px`;
    container.appendChild(gridNode);

    // add event listeners for mouse over and down so we can click and drag to fill nodes
    gridNode.addEventListener('mouseover', fillNode);
    gridNode.addEventListener('mousedown', fillNode);
}

function reset () {
    let gridNodes = document.querySelectorAll('.gridNode');
    for (gridNode of gridNodes) {
        gridNode.style.backgroundColor = "#ffffff";
    }
}

resetButton.addEventListener('click', reset);

function rainbow () {
    let valR = Math.floor(Math.random() * 251);
    let valG = Math.floor(Math.random() * 251);
    let valB = Math.floor(Math.random() * 251);
    return `rgb(${valR}, ${valG}, ${valB})`
}

let rainbowState = false;

function toggleRainbow () {
    if (rainbowState) {
        rainbowState = false;
    } else {
        rainbowState = true;
    }
}

rainbowbutton.addEventListener('click', toggleRainbow);

function fillNode(event) {
    // if the mouse if only hovering over a node do not fill
    if (event.type === 'mouseover' && !mouseDown ) {
        return
    } if (rainbowState) {
        event.target.style.backgroundColor = rainbow();
    } else {
        // when the mouse is clicked down or over and down fill node
        event.target.style.backgroundColor = "#8f8f8f";
    }
}