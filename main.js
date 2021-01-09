const { app, BrowserWindow } = require('electron');
const path = require('path')
const url = require('url')

const jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);

let window = null

function createWindow() {
  return new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'lamp-icon.icns'),
    webPreferences: {
      nodeIntegration: true
    },
    // Don't show the window until it's ready, this prevents any white flickering
    show: false
  });
}

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = createWindow();
  //window.webContents.openDevTools()

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
