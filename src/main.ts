import { app, BrowserWindow, powerSaveBlocker } from "electron";
import * as path from "path";
import * as url from "url";
import * as moment from "moment";
import * as reload from "electron-reload";
import { waitForUpdate } from './utils/GitBasedAutoUpdater';

reload(__dirname, {
  electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
  hardResetMethod: 'exit'
});


const isProduction = process.env.NODE_ENV == "production";
const isDev = !isProduction;

console.log("Mikes Mirror Starting Up..", { isProduction });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {

  // Create the window
  const window = isDev ? createWindowDev() : createWindowProd();

  // Load the page
  window.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // If we are dev mode lets open the dev tools
  //if (isDev)
    window.webContents.openDevTools();

  // Prevent the display from sleeping
  powerSaveBlocker.start("prevent-display-sleep");

  // Lets continually check git to see if there are updates and close if there are
  await waitForUpdate(30000);
  window.close();

});

// Quit when all windows are closed.
app.on("window-all-closed", () => app.quit());

const createWindowProd = () => new BrowserWindow({
  fullscreen: true,
  frame: false,
  webPreferences: {
    webSecurity: false
  }
});

const createWindowDev = () => new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    webSecurity: false
  }
});

