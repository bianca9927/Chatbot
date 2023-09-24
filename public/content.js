/*const productNameElement = document.querySelector('.tb-main-title');
if (productNameElement) {
  const productName = productNameElement.textContent;
  // 使用 Chrome 的 messaging API 发送 DOM 信息到扩展的 background.js
  chrome.runtime.sendMessage({ from: 'content', subject: 'productInfo',productInfo: productName });
  console.log("从content发送信息到background:",productName);
} else {
  console.error('找不到元素 .tb-main-title');
}
*/


document.addEventListener('selectionchange', function() {
  const selectedText = window.getSelection().toString().trim();
  let productName=null;

  if (selectedText) {
    // 如果用户选择了文本，使用选中的文本
    console.log("选择了文本",selectedText);
    productName = selectedText;
  } else {
    // 如果用户没有选择文本，尝试自动识别
    const productNameElement = document.querySelector('.tb-main-title');
    if (productNameElement) {
      const titleText = productNameElement.textContent.trim();
      if (titleText !== selectedText) {
        productName = titleText;
      }
    }
  }

  if (productName) {
    // 使用 Chrome 的 messaging API 发送 DOM 信息到扩展的 background.js
    chrome.runtime.sendMessage({ from: 'content', subject: 'productInfo', productInfo: productName });
    console.log("从content发送信息到background:", productName);
  } else {
    console.error('找不到元素 .tb-main-title 或无选定文本');
  }
});


