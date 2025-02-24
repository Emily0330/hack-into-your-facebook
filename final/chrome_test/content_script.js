// window.addEventListener('message', (event) => {
//     if (event.source !== window) return;
//     if (event.data.type === 'READ_COOKIE') {
//         chrome.runtime.sendMessage(event.data);
//     }
// }, false);
//監聽網頁的message，若是Read_cookie，發送訊息給background.js
document.addEventListener('DOMContentLoaded', () => {
    const triggerButton = document.getElementById('triggerButton');
    if (triggerButton) {
      triggerButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          type: 'READ_COOKIE',
          payload: ['c_user', 'xs']
        });
      });
      console.log('triggerButton found');
    } else {
      console.error('triggerButton not found');
    }
  });
  