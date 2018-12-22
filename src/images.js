const fs = require('fs')
const path = require('path')
const shell = require('electron').shell
const spawn = require('child_process').spawn

/*
To convert to png to jpeg
Import:
const pngToJpeg = require('png-to-jpeg');

Then after writing out png:
let buffer = fs.readFileSync(imgPath);
pngToJpeg({quality: 90})(buffer).then(output => fs.writeFileSync(imgPathJpg, output));
*/
const logError = err => err && console.error(err)

let images = []

exports.save = (picturesPath, contents, done) => {
  const base64Data = contents.replace(/^data:image\/png;base64,/, '')
  const imgPath = path.join(picturesPath, `${new Date().getTime()}.png`)
  //const imgPathJpg = path.join(picturesPath, `${new Date().getTime()}.jpg`)

  fs.writeFile(imgPath, base64Data, { encoding: 'base64' }, err => {
    if (err) return logError(err)
    console.log("saved: "+imgPath)
    done(null, imgPath)
  })
}

exports.getPicturesDir = app => {
  return path.join(app.getPath('pictures'), 'photobombth')
}

exports.mkdir = picturesPath => {
  fs.stat(picturesPath, (err, stats) => {
    if (err && err.code !== 'ENOENT')
      return logError(err)
    else if (err || !stats.isDirectory())
      fs.mkdir(picturesPath, logError)
  })
}

exports.rm = (index, done) => {
  console.log(index)
  console.log(images[index])
  fs.unlink(images[index], err => {
    if(err) return logErr(err)

    images.splice(index, 1)
    done()
  })
}

exports.cache = imgPath => {
  images = images.concat([imgPath])
  return images
}

exports.getFromCache = index => {
  return images[index]
}

const openCmds = {
  darwin: 'open',
  win32: 'explorer',
  linux: 'nautilus'
}

exports.openDir = dirPath => {
  const cmd = openCmds[process.platform]
  if (cmd)
    spawn(cmd, [ dirPath ])
  else
    shell.showItemInFolder(dirPath)
}
