
let backgrounds = ["../img/EJ.png",
                  "../img/img_1.png",
                  ]
let currentIndex = 0

function increment(){
  const nextIndex = currentIndex + 1 < backgrounds.length ? currentIndex + 1 : 0
  currentIndex = nextIndex

  console.log("Current index is now: " +currentIndex)
  return currentIndex
}

function decrement(){
  const nextIndex = currentIndex - 1 < 0 ? backgrounds.length -1 : currentIndex - 1
  currentIndex = nextIndex

  console.log("Current index is now: " +currentIndex)
  console.log("backgrounds length: " +backgrounds.length)

  return currentIndex
}

function applyBackground(canvasEl){
  console.log("Applying background #"+backgrounds[currentIndex])

  const ctx = canvasEl.getContext('2d');
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  var imageObj = new Image();
  imageObj.onload = function() {
    ctx.drawImage(imageObj, 0, 0);
  };
  imageObj.src = backgrounds[currentIndex];
  console.log("Applied background #"+backgrounds[currentIndex])

}

exports.prev = (canvasEl) => {
  decrement()
  applyBackground(canvasEl)
}

exports.next = (canvasEl) => {
  increment()
  applyBackground(canvasEl)
}

exports.restoreBackground = (canvasEl) => {
  applyBackground(canvasEl)
}

exports.getBackgroundImage = () => {
  var imageObj = new Image();
  imageObj.src = backgrounds[currentIndex];
  return imageObj;
}