const electron = require('electron')

const images = require('./images')
const menuTemplate = require('./menu')

const { app, BrowserWindow, ipcMain: ipc, Menu } = electron

let mainWindow = null

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    useContentSize: true,
    // For final build enable kiosk & turn frame off
    resizable: false,
    kiosk: false,
    frame: true,
  })

  //Open dev tools on startup - F12 otherwise
  //mainWindow.webContents.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/capture.html`)

  images.mkdir(images.getPicturesDir(app))

  mainWindow.on('closed', _ => {
    mainWindow = null
  })

  //const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow))
  //Menu.setApplicationMenu(menuContents)
})

ipc.on('image-captured', (evt, prefix, contents) => {
  images.save(images.getPicturesDir(app), prefix, contents, (err, imgPath) => {
    console.log("ipc imagePath: "+imgPath)
  })
})
