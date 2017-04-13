const path = require('path')
const { app, BrowserWindow, Tray } = require('electron')
const Positioner = require('electron-positioner')

app.dock.hide()
app.on('ready', () => {
  const tray = new Tray(path.resolve(__dirname, 'static', 'images', 'hue.png'))

  const view = new BrowserWindow({
    width: 300,
    height: 400,
    frame: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    show: false,
    alwaysOnTop: true,
    skipTaskbar: true
  })

  const pos = new Positioner(view)

  tray.on('click', () => {
    tray.setImage(path.resolve(__dirname, 'static', 'images', 'hue-white.png'))
    const { x, y } = pos.calculate('trayCenter', tray.getBounds())
    view.setPosition(x, y, false)
    view.show()
    view.focus()
  })

  view.on('show', () => {
    tray.setHighlightMode('always')
  })

  view.on('blur', () => {
    view.hide()
  })

  view.on('hide', () => {
    tray.setImage(path.resolve(__dirname, 'static', 'images', 'hue.png'))
    tray.setHighlightMode('never')
  })

  view.loadURL(`file://${__dirname}/static/index.html`)
})
