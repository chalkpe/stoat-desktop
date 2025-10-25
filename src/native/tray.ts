import { Menu, Tray, nativeImage } from "electron";

import trayIconAsset from "./icon.png?asset";
import { version } from "../../package.json";

import { mainWindow, quitApp } from "./window";

// internal tray state
let tray: Tray = null;

// Create and resize tray icon for macOS
function createTrayIcon() {
  const image = nativeImage.createFromDataURL(trayIconAsset);
  const resized = image.resize({ width: 20, height: 20 });

  // Mark as template image so it adapts to dark/light mode
  resized.setTemplateImage(true);

  return resized;
}

// trayIcon.setTemplateImage(true);

export function initTray() {
  const trayIcon = createTrayIcon();
  tray = new Tray(trayIcon);
  updateTrayMenu();
  tray.setToolTip("Toast");
  tray.setImage(trayIcon);
  tray.on("click", () => {
    mainWindow.show();
    mainWindow.focus();
  });
}

export function updateTrayMenu() {
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "Toast", type: "normal", enabled: false },
      {
        label: "Version",
        type: "submenu",
        submenu: Menu.buildFromTemplate([
          {
            label: version,
            type: "normal",
            enabled: false,
          },
        ]),
      },
      { type: "separator" },
      {
        label: mainWindow.isVisible() ? "Hide App" : "Show App",
        type: "normal",
        click() {
          if (mainWindow.isVisible()) {
            mainWindow.hide();
          } else {
            mainWindow.show();
          }
        },
      },
      {
        label: "Quit App",
        type: "normal",
        click: quitApp,
      },
    ]),
  );
}
