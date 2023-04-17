let userSelectedWidth;

while (!userSelectedWidth || userSelectedWidth < 0 || userSelectedWidth > 32) {
    userSelectedWidth = prompt("Please enter the number of pixels you would like per side between 0 and 32");
}

let gridWidth = 500;

// - 2 pixels for the border on each div
let gridNodeSide = gridWidth / userSelectedWidth - 2;

const container = document.querySelector('.container');
const resetButton = document.querySelector('.reset');

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
        gridNode.classList.remove('nodeFilled');
    }
}

resetButton.addEventListener('click', reset);

function fillNode(event) {
    // if the mouse if only hovering over a node do not fill
    if (event.type === 'mouseover' && !mouseDown ) {
        return
    } else {
        // when the mouse is clicked down or over and down fill node
        event.target.classList.add('nodeFilled');
    }
}