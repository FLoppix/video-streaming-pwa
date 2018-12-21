import * as ReactNotifications from 'react-notifications';
import isElectron from 'is-electron';

export const createNotification = (type, message, title) => {
  switch (type) {
    case 'success':
      ReactNotifications.NotificationManager.success(message, title, 3000);
      break;
    case 'warning':
      ReactNotifications.NotificationManager.warning(message, title, 3000);
      break;
    case 'info':
      ReactNotifications.NotificationManager.info(message, title, 3000);
      break;
    case 'error':
      ReactNotifications.NotificationManager.error(message, title, 3000);
      break;
    default:
      ReactNotifications.NotificationManager.error(
        'Bad parameter',
        'System error',
        3000
      );
      break;
  }
};

export const createDesktopNotification = message => {
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + '//' + getUrl.host;
  if (!Notification) {
    console.error(
      'Desktop notifications are not available in your browser. Try Chromium.'
    );
    return;
  }

  if (Notification.permission !== 'granted') Notification.requestPermission();
  else {
    var notification = new Notification('AWT PWA', {
      icon: baseUrl + '/favicon.ico',
      body: message,
    });

    notification.onclick = function() {
      window.open(baseUrl + '/downloads');
    };
  }
};

export const getOs = () => {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
};

export const createNativeNotification = (message, title) => {
  if (!isElectron()) {
    return;
  }
  const data = {
    title: title,
    message: message,
  };
  var os = getOs();
  switch (os) {
    case 'Mac OS':
    case 'iOS':
    case 'Android':
    case 'Linux':
      window.ipcRenderer.send('sendNativeNotification', data);
      break;
    case 'Windows':
      window.ipcRenderer.send('sendWindowsNotification', data);
      break;
    default:
      break;
  }
};
