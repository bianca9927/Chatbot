import React from 'react';
class ActionProvider {
  constructor(
   createChatBotMessage,
   setStateFunc,
   createClientMessage,
   stateRef,
   createCustomMessage,
   
   //sessionId,
   //productInfo,
   ...rest
 ) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
   this.createClientMessage = createClientMessage;
   this.stateRef = stateRef;
   this.createCustomMessage = createCustomMessage;
   
   //this.sessionId=Math.random().toString(36).substring(7);
   //this.sessionId=Math.random().toString(36).substring(2, 15) + '-' + Math.random().toString(36).substring(2, 15);
  

 }



    
 async fetchDialogflowResponse(message) {
  try {
    console.log('Fetching response for message:', message);

    // Make a request to the backend server to get a response from the Dialogflow API
    const response = await fetch(`http://34.42.20.237:3000/detect-intent?queryText=${encodeURIComponent(message)}`);
  
    const data = await response.json();
    console.log('response in frontend:', data);

    if (data && data.queryResult && data.queryResult.responseMessages) {
      const responseMessages = data.queryResult.responseMessages;
      const messages = []; // 用于存储所有消息

      for (const message of responseMessages) {
        if (message.text && message.text.text.length > 0) {
          // 处理文本消息
          console.log('Intent Response:', message.text.text[0]);
          const textMessage = this.createChatBotMessage(message.text.text[0]);
          messages.push(textMessage);
        }
        if (message.payload && message.payload.text && message.payload.text.length > 0) {
          // 获取消息数组
          const textMessages = message.payload.text;
          
          // 遍历并推送每条消息到 messages 数组中
          textMessages.forEach((text) => {
            const textMessage = this.createChatBotMessage(text);
            messages.push(textMessage);
          });
        }
        
        if (message.payload && message.payload.image) {
          // 处理图片消息
          console.log("图片信息");
          const { imageUrl, accessibilityText } = message.payload.image;
          console.log("打印图片json：", imageUrl, accessibilityText);
          const imageMessage = this.createChatBotMessage(
            <img src={imageUrl} alt={accessibilityText} style={{maxWidth: '400px', maxHeight: '200px', width: '100%',height: 'auto'}}/>      
          );
          //添加widget，并给widget附上两个参数image url 和acc
          messages.push(imageMessage);

          if (React.isValidElement(imageMessage)) {
            // imageMessage 是有效的 React 元素
            // 在这里可以使用它
          } else {
            console.error('createImageMessage 返回的不是有效的 React 元素:', imageMessage);
          }
        }
      }

      // 添加所有消息到聊天
      for (const msg of messages) {
        this.setChatbotMessage(msg);
      }
    } else {
      console.error('Unexpected data structure:', data);
      const errorMessage = this.createChatBotMessage('Sorry, I can not parse your data. Could you refresh shopping website and reopen me?');
      this.setChatbotMessage(errorMessage);
    }
  } catch (error) {
    console.error('Error fetching data from server:', error);
    const errorMessage = this.createChatBotMessage(`I don't know how to find products on all websites yet. Please follow the study instructions so that I am able to show you what I'm able to do😊`);
    this.setChatbotMessage(errorMessage);
  }
}
/*
async sendSecondRequest() {
  try {
    // Make a request to the backend server to send the cached product name to Dialogflow
    console.log("进入二次请求");
   // const secondResponse = await fetch('http://localhost:3000/send-product-info-to-dialogflow');
  
   const secondResponse = await fetch('http://34.42.20.237:3000/send-product-info-to-dialogflow');
    const secondData = await secondResponse.json();
    
    console.log('Second response:', secondData);
    // Process the second response if needed
  } catch (error) {
    console.error('Error sending second request:', error);
    // Handle the error if necessary
  }
}
*/



helloWorldHandler=async()=>{
  const message=this.createChatBotMessage("hello world, default")
  this.setChatbotMessage(message)
 }
todosHandler=async ()=>{
  const message=this.createChatBotMessage("Sure.Here's your todos.",{
    widget:"todos",
  });
  this.setChatbotMessage(message);
}



handleDialogflowResponse(responseText) {
  const message = this.createChatBotMessage(responseText);
  this.setChatbotMessage(message);
}
 setChatbotMessage=(message)=>{
  this.setState(state=>({...state,messages:[...state.messages,message]}))
 }
}



export default ActionProvider;