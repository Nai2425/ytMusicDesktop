const { app, BrowserWindow } = require("electron");

let mainWindow;
let splashWindow;

function createSplash() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });

  splashWindow.loadFile("splash.html");
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      partition: "persist:ytmusic",
    },
  });

  mainWindow.loadURL("https://music.youtube.com");

  mainWindow.once("ready-to-show", () => {
    try {
      splashWindow.destroy();
    } catch (e) {
      console.log("Splash already closed");
    }
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  createSplash();
  createMainWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
