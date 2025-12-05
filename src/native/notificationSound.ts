import { mainWindow } from "./window";

import notificationSoundAsset from "../message.ogg?asset";

/**
 * Initialize notification sound handler
 * Hooks into the renderer's Notification API to play a sound when notifications are created
 */
export function initNotificationSound() {
  mainWindow.webContents.on("did-finish-load", setupNotificationHook);
  mainWindow.webContents.on("did-navigate-in-page", setupNotificationHook);
}

/**
 * Inject notification hook into the renderer
 */
function setupNotificationHook() {
  mainWindow.webContents.executeJavaScript(`
    (function() {
      if (window.__notificationHooked) return;
      window.__notificationHooked = true;
      
      const OriginalNotification = window.Notification;
      
      window.Notification = function(title, options) {
        const audio = new Audio('${notificationSoundAsset}');
        audio.volume = 0.5;
        audio.play().catch(() => {});
        
        const notification = new OriginalNotification(title, options);
        
        notification.addEventListener('click', () => {
          window.native.show();
        });
        
        return notification;
      };
      
      window.Notification.permission = OriginalNotification.permission;
      window.Notification.requestPermission = OriginalNotification.requestPermission.bind(OriginalNotification);
    })();
  `).catch(() => {});
}
