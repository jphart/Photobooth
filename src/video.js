const constraints = {
  audio: false,
  video: {
    mandatory: {
      minWidth: 853,
      minHeight: 480,
      //minWidth: 1280,
      //minHeight: 800,
      maxWidth: 1280,
      maxHeight: 800
    }
  }
}

function handleSuccess(videoEl, stream) {
  videoEl.src = window.URL.createObjectURL(stream)
}

function handleError(error) {
  console.log('Camera error: ', error)
}

exports.init = (nav, videoEl) => {
  nav.getUserMedia = nav.webkitGetUserMedia
  nav.getUserMedia(constraints, stream => handleSuccess(videoEl, stream), handleError)
}

exports.captureRawVideoBytes = (videoEl, ctx, canvasEl) => {
  ctx.drawImage(videoEl, 0, 0)
  return canvasEl.toDataURL('image/jpeg',0.99)
}

exports.captureBytes = (videoEl, ctx, canvasEl, imgOverlay) => {

  //Mirror the video to match the css transform
  ctx.translate(videoEl.width, 0);
  ctx.scale(-1, 1);

  ctx.drawImage(videoEl, 0, 0)

  //Now flip back to add the overlay on top in the correct way.
  ctx.translate(videoEl.width, 0);
  ctx.scale(-1, 1);

  ctx.drawImage(imgOverlay, 0, 0)
  return canvasEl.toDataURL('image/jpeg',0.99)
}

exports.captureBytesFromLiveCanvas = canvas => {
  return canvas.toDataURL('image/jpeg',1.0)
}
