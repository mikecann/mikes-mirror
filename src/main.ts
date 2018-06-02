import { app, BrowserWindow, powerSaveBlocker } from "electron";
import * as path from "path";
import * as url from "url";
import * as reload from "electron-reload";
import { waitForUpdate } from './utils/GitBasedAutoUpdater';
import { exec } from "child_process";

// Work out if we are running in prod mode or not
const isProduction = process.env.NODE_ENV == "production";
const isDev = !isProduction;

// If we are in dev mode then listen for updates to the renderer code and reload 
if (isDev)
  reload(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });

console.log("Mikes Mirror Starting Up..", { isProduction });

// This method will be called when Electron has finished
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
  if (isDev)
    window.webContents.openDevTools();

  // Prevent the display from sleeping
  powerSaveBlocker.start("prevent-display-sleep");

  // Lets move the mouse out the way if we can
  hideMouse();

  // After 2 hours lets manually restart, just incase..
  setTimeout(() => window.close(), 2 * 3600 * 1000);

  // Lets continually check git to see if there are updates and close if there are
  await waitForUpdate(30000);
  window.close();

});

// Quit when all windows are closed.
app.on("window-all-closed", () => app.quit());

const createWindowProd = () => new BrowserWindow({
  fullscreen: true,
  frame: false,
  // webPreferences: {
  //   webSecurity: false
  // }
});

const createWindowDev = () => new BrowserWindow({
  width: 800,
  height: 600,
  // webPreferences: {
  //   webSecurity: false
  // }
});

const hideMouse = () => exec("xdotool mousemove 0 30000", (err, stdout, stderr) => {
  if (err)
    return console.error("Canot move the mouse out the way, its not a biggie, will continue on anways.. ", err);
});

