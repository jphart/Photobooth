const electron = require('electron')

const countdown = require('./countdown')
//const effects = require('./effects')
const flash = require('./flash')
const video = require('./video')
const backgrounds = require('./backgrounds.js')

const { ipcRenderer: ipc, shell, remote } = electron

const images = remote.require('./images')

//let canvasTarget
//let seriously
//let videoSrc

function formatImgTag(doc, bytes) {
  const div = doc.createElement('div')
  div.classList.add('photo')
  const close = doc.createElement('div')
  close.classList.add('photoClose')
  const img = new Image()
  img.classList.add('photoImg')
  img.src = bytes
  div.appendChild(img)
  div.appendChild(close)
  return div
}


window.addEventListener('DOMContentLoaded', _ => {
  const videoEl = document.getElementById('video')
  const canvasEl = document.getElementById('canvas')
  const recordEl = document.getElementById('record')
  const photosEl = document.querySelector('.photosContainer')
  const counterEl = document.getElementById('counter')
  const flashEl = document.getElementById('flash')
  const previousEl = document.getElementById('previous')
  const nextEl = document.getElementById('next')
/*
  seriously = new Seriously()
  videoSrc = seriously.source('#video')
  canvasTarget = seriously.target('#canvas')
  effects.choose(seriously, videoSrc, canvasTarget)
*/
  video.init(navigator, videoEl)
  const ctx = canvasEl.getContext('2d')

  console.log("WIDTH: "+videoEl.width);
  console.log("Height: "+videoEl.height);


  //Initialise default background
  backgrounds.restoreBackground(canvasEl);

  previousEl.addEventListener('click', _ => {
    console.log("Prev called")
    backgrounds.prev(canvasEl)
  })

  nextEl.addEventListener('click', _ => {
    console.log("Next called")
    backgrounds.next(canvasEl)
  })

  recordEl.addEventListener('click', _ => {
    countdown.start(counterEl, 3, _ => {
      flash(flashEl)
      //const bytes = video.captureBytesFromLiveCanvas(canvasEl)
      let imageObj = backgrounds.getBackgroundImage();
      console.log("Got image")
      const bytes = video.captureBytes(videoEl, ctx, canvasEl, imageObj);
      ipc.send('image-captured', bytes);
      //photosEl.appendChild(formatImgTag(document, bytes));


      //Pause here for a second.

      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      backgrounds.restoreBackground(canvasEl);
    })
  })

  /*photosEl.addEventListener('click', evt => {
    const isRm = evt.target.classList.contains('photoClose')
    const selector = isRm ? '.photoClose' : '.photoImg'

    const photos = Array.from(document.querySelectorAll(selector))
    const index = photos.findIndex(el => el == evt.target)

    if (index > -1) {
      if (isRm)
        ipc.send('image-remove', index)
      else
        shell.showItemInFolder(images.getFromCache(index))
    }
  })
  */

})

ipc.on('image-removed', (evt, index) => {
  document.getElementById('photos').removeChild(Array.from(document.querySelectorAll('.photo'))[index])
})

/*
ipc.on('effect-cycle', evt => {
  effects.cycle(seriously, videoSrc, canvasTarget)
})

ipc.on('effect-choose', (evt, effectName) => {
  effects.choose(seriously, videoSrc, canvasTarget, effectName)
})
*/
