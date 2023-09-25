document.addEventListener('selectionchange', function() {
  const selectedText = window.getSelection().toString().trim();
  let productName=null;

  if (selectedText) {
    console.log("choose text",selectedText);
    productName = selectedText;
  } else {
    const productNameElement = document.querySelector('.tb-main-title');
    if (productNameElement) {
      const titleText = productNameElement.textContent.trim();
      if (titleText !== selectedText) {
        productName = titleText;
      }
    }
  }

  if (productName) {
    chrome.runtime.sendMessage({ from: 'content', subject: 'productInfo', productInfo: productName });
    console.log("send msg to background", productName);
  } else {
    console.error('can not find dom info');
  }
});


