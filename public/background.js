let storedProductInfo = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.from === 'content' && msg.subject === 'productInfo') {
    storedProductInfo = msg.productInfo;
  // 在这里处理产品信息
    console.log('产品信息已经保存在background', storedProductInfo);
    sendProductInfoToServer(storedProductInfo);
    console.log("background已经将信息发送给server");
  }
});







/*let productInfoFromContent = null;

// 监听来自 Content Script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("从content接收了消息:", message.productInfo);
  if (message.productInfo) {
    // 将产品信息保存为全局变量
    productInfoFromContent = message.productInfo;
console.log("全局变量已经保存：",productInfoFromContent);
    // 发送产品信息给 ActionProvider
    //chrome.runtime.sendMessage({ productInfo: message.productInfo });
    //console.log("已从 background 发送", message.productInfo);
  }
});

// 添加一个消息监听，以供 ActionProvider 获取产品信息
/*chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.getAction === "getProductInfo") {
    sendResponse({ productInfo: productInfoFromContent });
  }
});*/
/*
// 监听来自 Content Script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Listening content:",message.productInfo);
  if (message.productInfo) {
    // 将产品信息发送到服务器
   // sendProductInfoToServer(message.productInfo);
    
    console.log("已从background发送",message.productInfo);
  }
});
*/

async function sendProductInfoToServer(productInfo) {
  console.log('Background 发送名称给服务器');
 const serverUrl = 'http://34.42.20.237:3000/send-productinfo-to-dialogflow';
  const requestData = { productInfo };
  console.log('Sending product info to server:', requestData);
  // 使用 fetch 或其他 HTTP 请求库发送 POST 请求到服务器
  console.log('发送的内容是:', JSON.stringify(requestData));
  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
    
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('background从服务器接收到的回复是：', data);
    })
    
    .catch((error) => {
      console.error('Error sending product info to server:', error);
      console.log('Error details:', error.message, error.response);
    });
}
