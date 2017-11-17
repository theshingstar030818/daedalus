const { ipcRenderer } = require('electron');
console.log('test');
ipcRenderer.on('ping', () => {
  console.log('ping');
  ipcRenderer.sendToHost('pong');
});
