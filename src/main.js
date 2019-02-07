const electron = require('electron')

const images = require('./images')
const menuTemplate = require('./menu')

const { app, BrowserWindow, ipcMain: ipc, Menu } = electron

let mainWindow = null

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,

    // For final build enable kiosk.
    resizable: true
    //kiosk: true
  })

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/capture.html`)

  images.mkdir(images.getPicturesDir(app))

  mainWindow.on('closed', _ => {
    mainWindow = null
  })

  const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow))
  Menu.setApplicationMenu(menuContents)
})

ipc.on('image-captured', (evt, contents) => {
  images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
    console.log("ipc imagePath: "+imgPath)
    images.cache(imgPath)
  })
})

ipc.on('image-remove', (evt, index) => {
  images.rm(index, _ => {
    evt.sender.send('image-removed', index)
  })
})
