let storedProductInfo = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.from === 'content' && msg.subject === 'productInfo') {
    storedProductInfo = msg.productInfo;
    sendProductInfoToServer(storedProductInfo);
  }
});


async function sendProductInfoToServer(productInfo) {
  //console.log('Background send msg to server');
 const serverUrl = 'http://34.42.20.237:3000/send-productinfo-to-dialogflow';
  const requestData = { productInfo };
  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
    
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log('background get response from server：', data);
    })
    
    .catch((error) => {
      console.error('Error sending product info to server:', error);
      console.log('Error details:', error.message, error.response);
    });
}
