// js part

function createGrid(itemDimension=16) {
  let gridContainer = document.querySelector(".gridContainer");
  for (let i = 0; i<itemDimension*itemDimension; i++) {
      let gridItem  = document.createElement('div');
      gridContainer.appendChild(gridItem);
      gridItem.style.width = 500/itemDimension + 'px';
      gridItem.style.height = 500/itemDimension + 'px';
      gridItem.classList.add('gridItem');
  }
  let gridItems = document.querySelectorAll('.gridItem');
  let penColor = document.querySelector('.penColor');
  gridItems.forEach(function(gridItem) {
    gridItem.addEventListener('mouseover', function() {
      this.style.backgroundColor = penColor.value;
    });
  });
  updatePenColor();
  toggleRgbColor();
  toggleEraser();
  toggleGridLine(); 
  clearGrid();
  updateBgColor();
}

function deleteExistingGrid() {
  let gridContainer = document.querySelector(".gridContainer");
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function updatePenColor() {
  let penColor = document.querySelector('.penColor');
  let gridItems = document.querySelectorAll('.gridItem');
  penColor.addEventListener('input', function() {
    gridItems.forEach(function(gridItem) {
      gridItem.addEventListener('mouseover', function() {
        this.style.backgroundColor = penColor.value;
      });
    });
  });
}

function toggleEraser() {
  let eraser = document.querySelector('.eraser');
  let gridItems = document.querySelectorAll('.gridItem');
  let gridContainer = document.querySelector('.gridContainer');
  eraser.addEventListener('click', function() {
    gridItems.forEach(function(gridItem) {
      gridItem.addEventListener('mouseover', function() {
        this.style.backgroundColor = gridContainer.style.backgroundColor;
      });
    });
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
  let gridItems = document.querySelectorAll('.gridItem');
  rgb.addEventListener('click', function() {
    gridItems.forEach(function(gridItem) {
      gridItem.addEventListener('mouseover', function() {
        this.style.backgroundColor = getRandomRgb();
      });
    });
  });
}

function updateGridDimension() {
  let rangeSlider = document.querySelector('#rangeSlider');
  let grids = document.querySelector('.grids');
  rangeSlider.addEventListener('input', function() {
    grids.textContent = rangeSlider.value;
    deleteExistingGrid();
    createGrid(rangeSlider.value);
  })
}

function toggleGridLine() {
  let toggleBtn = false;
  let gridLine = document.querySelector('.gridLine');
  let gridItems = document.querySelectorAll('.gridItem');
  gridLine.removeEventListener('click', toggleGridLine);
  gridLine.addEventListener('click', function() {
    gridItems.forEach(function(gridItem) {
      gridItem.style.border = toggleBtn? 'solid 1px white' : 'none';
    });
    toggleBtn = !toggleBtn;
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

createGrid();
updateGridDimension();

// add toggle functionality
