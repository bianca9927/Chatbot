const productNameElement = document.querySelector('.tb-main-title');
if (productNameElement) {
  const productName = productNameElement.textContent;
  // 使用 Chrome 的 messaging API 发送 DOM 信息到扩展的 background.js
  chrome.runtime.sendMessage({ from: 'content', subject: 'productInfo',productInfo: productName });
  console.log("从content发送信息到background:",productName);
} else {
  console.error('找不到元素 .tb-main-title');
}





