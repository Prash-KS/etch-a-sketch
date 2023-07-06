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

function updateEvent(color, random=false) {
  if(color == undefined) color = '#000000';
  let gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(function(gridItem) {
        gridItem.removeEventListener('mouseover', updateEvent);
        gridItem.addEventListener('mouseover', function(e) {
          this.style.backgroundColor = random ? getRandomRgb() : color;
          console.log(e);
        });
    });
}

function updatePenColor() {
  let penColor = document.querySelector('.penColor');
  penColor.addEventListener('input', function() {
    updateEvent(penColor.value);
});
}

function toggleEraser() {
  let eraser = document.querySelector('.eraser');
  let gridContainer = document.querySelector('.gridContainer');
  eraser.addEventListener('click', function() {
    updateEvent(gridContainer.style.backgroundColor);
  });
}

function updateBgColor() {
  let bgColor = document.querySelector('.bgColor');
  let gridContainer = document.querySelector('.gridContainer');
  bgColor.removeEventListener('input', updateBgColor);
  bgColor.addEventListener('input', function() {
    gridContainer.style.backgroundColor = bgColor.value;
  });
}

function getRandomRgb() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  rgbColor = `rgb(${red}, ${green}, ${blue})`;
  return rgbColor;
}

function toggleRgbColor() {
  let rgb = document.querySelector('.rgb');
  rgb.addEventListener('click', function() {
    updateEvent(null, true);
});
}

function clearGrid() {
  let clear = document.querySelector('.clear');
  let gridItems = document.querySelectorAll('.gridItem');
  clear.removeEventListener('click', clearGrid);
  clear.addEventListener('click', function() {
    gridItems.forEach(function(gridItem) {
      gridItem.style.backgroundColor = '';
    });
  });
}

createGrid(16);
updateEvent();
updatePenColor();
toggleRgbColor();
toggleEraser();
clearGrid();
updateBgColor();