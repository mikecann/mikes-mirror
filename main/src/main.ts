import { app, BrowserWindow } from "electron";
import { FaceDetectionService } from "./FaceDetectionService";
import * as path from "path";
import * as url from "url";
import { checkForUpdate } from "./CheckForUpdates";
import * as moment from "moment";
import { PerformanceService } from "./PerformanceService";

let mainWindow: Electron.BrowserWindow;
let faceDetection: FaceDetectionService;
let performanceService: PerformanceService;

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

  performanceService = new PerformanceService(mainWindow);
  performanceService.start();
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
    frame: false,
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