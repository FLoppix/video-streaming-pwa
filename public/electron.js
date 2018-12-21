/* eslint-disable */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const appId = 'com.example.electron-cra';

require('electron-debug')({ showDevTools: true });

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: `${path.join(__dirname, '/preload.js')}`,
    },
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.setAppUserModelId(appId);

ipcMain.on('sendWindowsNotification', (event, data) => {
  const WindowsToaster = require('node-notifier').WindowsToaster;
  var notifier = new WindowsToaster({
    withFallback: false,
  });
  notifier.notify({
    title: data.title,
    message: data.message,
    icon: `${path.join(__dirname, '/images/icons/electron.png')}`,
    sound: true,
    wait: true,
  });
});

ipcMain.on('sendNativeNotification', (event, data) => {
  var notifier = require('node-notifier');
  notifier.notify({
    title: data.title,
    message: data.message,
    icon: `${path.join(__dirname, '/images/icons/electron.png')}`,
    sound: true,
    wait: true,
  });
});
