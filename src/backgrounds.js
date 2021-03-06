
let backgrounds = [
                  "../img/blank.png",
                  "../img/Bride_and_groom.png",
                  "../img/Classic_Gold_Frame.png",
				  "../img/EJ.png",
                  "../img/text.png",
                  "../img/emoticon.png",
                  "../img/happily.png",
				  
				  "../img/microphone.png",
                  "../img/drumkit.png",
                  "../img/Trumpeter.png",
				  "../img/stage_lights.png",
                  "../img/theater-curtains.png",
				  "../img/f1.png",
				  
                  "../img/tinder.png",
                  "../img/astronaut.png",
                  "../img/underwater.png",
                  "../img/giraffe.png",
                  "../img/prison.png",
                  "../img/mario.png",
                  "../img/Mona_Lisa.png",
                  "../img/polaroid.png",
                  
				  "../img/bond.png",
				  "../img/film.png",                  

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
