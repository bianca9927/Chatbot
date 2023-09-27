document.addEventListener('selectionchange', function() {
  let productName=null;
  productName = document.querySelector('.tb-main-title');
  

  if (productName) {
    chrome.runtime.sendMessage({ from: 'content', subject: 'productInfo', productInfo: productName });
    console.log("send msg to background", productName);
  } else {
    console.error('can not find dom info');
  }
});


