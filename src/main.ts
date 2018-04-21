import { app, BrowserWindow, powerSaveBlocker } from "electron";
import { FaceDetectionService } from "./services/FaceDetectionService";
import * as path from "path";
import * as url from "url";
import * as moment from "moment";
import { SystemInformationService } from "./services/SystemInformationService";
import * as reload from "electron-reload";
import { checkForUpdate } from './utils/gitUpdates';

reload(__dirname, {
  electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
  hardResetMethod: 'exit'
});


let mainWindow: Electron.BrowserWindow;
let faceDetection: FaceDetectionService;
let systemInfoService: SystemInformationService;

const isProduction = process.env.NODE_ENV == "production";
const isDev = !isProduction;

console.log("Mikes Mirror Starting Up..", { isProduction });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {

  // Create the window
  isDev ? createWindowDev() : createWindowProd()

  // Prevent the display from sleeping
  powerSaveBlocker.start("prevent-display-sleep");

   // faceDetection = new FaceDetectionService(mainWindow);
  // faceDetection.start();

  systemInfoService = new SystemInformationService(mainWindow);
  systemInfoService.start();

});

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

function createWindowProd() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
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
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.webContents.openDevTools();
}

function watchForUpdates() {
  const interval = 30000;
  console.log(`Beginning to check for updates every ${interval} ms`);

  setInterval(() => {
    checkForUpdate(hasUpdate => { 
      if (!hasUpdate)
        return console.log(`${moment().format("MMMM Do YYYY, h:mm:ss a")} - Currently up to date`);
      
      console.log("Detected that remote has an update for us, stopping app.");
      mainWindow.close();
    });
   
  }, interval)
}

watchForUpdates();