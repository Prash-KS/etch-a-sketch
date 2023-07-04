// js part

function createGrid(itemDimension) {
    let gridContainer = document.querySelector(".gridContainer");
    for (let i = 0; i<itemDimension*itemDimension; i++) {
        let gridItem  = document.createElement('div');
        gridContainer.appendChild(gridItem);
        gridItem.style.width = 500/itemDimension + 'px';
        gridItem.style.height = 500/itemDimension + 'px';
        gridItem.classList.add('gridItem');
    }
}

function hoverGrey() {
    let gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(function(gridItem) {
        gridItem.addEventListener('mouseover', function() {
            this.classList.add('greyHover');
        });
    })
}

function getRandomRgb() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    rgbColor = `rgb(${red}, ${green}, ${blue})`;
    return rgbColor;
}

function hoverRgb() {
    let gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(function(gridItem) {
        gridItem.addEventListener('mouseover', function() {
            gridItem.style.backgroundColor = getRandomRgb();
        });
    })
}

createGrid(16);
hoverRgb();



