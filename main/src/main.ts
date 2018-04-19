import { app, BrowserWindow } from "electron";
import { FaceDetectionService } from "./FaceDetectionService";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;
let faceDetection: FaceDetectionService;

const isProduction = process.env.NODE_ENV == "production";
const isDev = !isProduction;

console.log("Mikes Mirror Starting Up..", { isProduction });

function createWindow() {

  if (isDev)
    createWindowDev();
  else 
    createWindowProd();


  // faceDetection = new FaceDetectionService(mainWindow);
  // faceDetection.start();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }

  if (faceDetection)
    faceDetection.stop();
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }

});

function createWindowProd() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      webSecurity: false
    }
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './renderer/build/index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

function createWindowDev() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false
    }
  });
  mainWindow.loadURL('http://localhost:3000');
  mainWindow.webContents.openDevTools();
}
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.