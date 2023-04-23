const gridWidth = 500;
const container = document.querySelector('.container');
const resetButton = document.querySelector('.reset');
const rainbowbutton = document.querySelector('.rainbow');
const setGrid = document.querySelector('.setGridSize')
let userSelectedWidth;

while (!userSelectedWidth || userSelectedWidth < 0 || userSelectedWidth > 32) {
    userSelectedWidth = prompt("Please enter the number of pixels you would like per side between 0 and 32");
}

// tack the state of the mouse click so we can drag and draw
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function cleanGrid () {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

function drawGrid () {
    cleanGrid();
    // - 2 pixels for the border on each div
    let gridNodeSide = gridWidth / userSelectedWidth - 2;

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
}

function reset () {
    let gridNodes = document.querySelectorAll('.gridNode');
    for (gridNode of gridNodes) {
        gridNode.style.backgroundColor = "#ffffff";
    }
}

resetButton.addEventListener('click', reset);

function defineGrid () {
    userSelectedWidth = -1;
    while (!userSelectedWidth || userSelectedWidth < 0 || userSelectedWidth > 32) {
        userSelectedWidth = prompt("Please enter the number of pixels you would like per side between 0 and 32");
    }

    drawGrid();
}

setGrid.addEventListener('click', defineGrid);

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

function extractR (rgbString) {
    rawValues = rgbString.slice(4, -1)
    rgbArray = rawValues.split(", ")
    return rgbArray[0]
}

function fillNode(event) {
    // if the mouse is only hovering over a node do not fill
    if (event.type === 'mouseover' && !mouseDown ) {
        return
    } if (rainbowState) {
        event.target.style.backgroundColor = rainbow();
    } else {
        // when the mouse is clicked down or over and down fill node
        if (!event.target.style.backgroundColor) {
            event.target.style.backgroundColor = "rgb(200, 200, 200)";
        } else {
            // to make the grey darker we do not need the R, G and B values as to turn from white to black you increment
            // all equally so we take the r and treat it as the base for G and B.
            currentVal = event.target.style.backgroundColor;
            r = extractR(currentVal)
            event.target.style.backgroundColor = `rgb(${r - 20}, ${r - 20}, ${r - 20})`;
        }
    }
}

drawGrid();
