const constraints = {
  audio: false,
  video: {
    mandatory: {
      minWidth: 853,
      minHeight: 480,
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

exports.captureBytes = (videoEl, ctx, canvasEl) => {
  ctx.drawImage(videoEl, 0, 0)
  return canvasEl.toDataURL('image/png')
}

exports.captureBytesFromLiveCanvas = canvas => {
  return canvas.toDataURL('image/png')
}
