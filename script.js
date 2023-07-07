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
  penColor();
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

function penColor() {
  let gridItems = document.querySelectorAll('.gridItem');
  let penColor = document.querySelector('.penColor');
  gridItems.forEach(function(gridItem) {
    gridItem.addEventListener('mouseover', function() {
      this.style.backgroundColor = penColor.value;
    });
  });
}

function toggleClickColor(eraserBtn, rgbButton) {
  let eraser = document.querySelector('.eraser');
  eraser.style.border = eraserBtn? 'solid 3px rgb(0, 255, 234)' : 'solid 3px rgb(21, 25, 255)';

  let rgb = document.querySelector('.rgb');
  rgb.style.border = rgbButton? 'solid 3px rgb(0, 255, 234)' : 'solid 3px rgb(21, 25, 255)';
}

function swapEraser() {
  let gridItems = document.querySelectorAll('.gridItem');
  let gridContainer = document.querySelector('.gridContainer');
  gridItems.forEach(function(gridItem) {
    gridItem.addEventListener('mouseover', function() {
      this.style.backgroundColor = gridContainer.style.backgroundColor;
    });
  });
}

function toggleEraser() {
  let toggleBtn = false;
  let eraser = document.querySelector('.eraser');
  eraser.addEventListener('click', function() {
    if(toggleBtn) penColor(); else swapEraser();
    toggleBtn = !toggleBtn;
    toggleClickColor(toggleBtn, false);
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

function swapRgb() {
  let gridItems = document.querySelectorAll('.gridItem');
  gridItems.forEach(function(gridItem) {
    gridItem.addEventListener('mouseover', function() {
      this.style.backgroundColor = getRandomRgb();
    });
  });
}

function toggleRgbColor() {
  let toggleBtn = false;
  let rgb = document.querySelector('.rgb');

  rgb.addEventListener('click', function() {
    if(toggleBtn) penColor(); else swapRgb();
    toggleBtn = !toggleBtn;
    toggleClickColor(false, toggleBtn);
  });
}

function updateGridDimension() {
  let rangeSlider = document.querySelector('#rangeSlider');
  let grids = document.querySelector('.grids');
  rangeSlider.addEventListener('input', function() {
    grids.textContent = rangeSlider.value + ' x ' + rangeSlider.value;
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
    gridLine.style.border = toggleBtn? 'solid 3px rgb(0, 255, 234)' : 'solid 3px rgb(21, 25, 255)';
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

function sliderColor() {
  const slider = document.getElementById("rangeSlider")
  const min = slider.min
  const max = slider.max
  const value = slider.value

  slider.style.background = `linear-gradient(to right, rgb(0, 247, 255) 0%, rgb(0, 247, 255) ${(value-min)/(max-min)*100}%, #DEE2E6 ${(value-min)/(max-min)*100}%, #DEE2E6 100%)`

  slider.oninput = function() {
    this.style.background = `linear-gradient(to right, rgb(0, 247, 255) 0%, rgb(0, 247, 255) ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 100%)`
};
}

createGrid();
updateGridDimension();
sliderColor();

