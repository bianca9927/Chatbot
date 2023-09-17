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
  let response = null;
  try {
    console.log('Fetching response for message:', message);

    // Make a request to the backend server to get a response from the Dialogflow API
  //  response = await fetch(`http://localhost:3000/detect-intent?queryText=${encodeURIComponent(message)}`);
  response = await fetch(`http://34.42.20.237:3000/detect-intent?queryText=${encodeURIComponent(message)}`);
  
    const data = await response.json();
    console.log('response in frontend:', data);

   // 处理主动消息
   if (data && data.queryResult && data.queryResult.responseMessages) {
    const responseMessages = data.queryResult.responseMessages;
    for (const message of responseMessages) {
      if (message.platform === 'ACTIONS_ON_GOOGLE') {
        // 这是 Dialogflow 的主动消息，你可以根据需要执行操作
        console.log('Received proactive message from Dialogflow:', message);
        // 在这里执行相关操作，例如更新界面或向用户发送通知
      } else if (message.text && message.text.text.length > 0) {
        // 处理普通文本消息
        console.log('Intent Response:', message.text.text[0]);
        const intentResponse = message.text.text[0];
        const chatBotMessage = this.createChatBotMessage(intentResponse);
        this.setChatbotMessage(chatBotMessage);

        // 如果消息是 "OK"，则发送第二个请求
        /*if (intentResponse === 'OK. Please wait a moment. I am getting information from this page now😊') {
          console.log('Received "OK" response, sending second request...');
          await this.sendSecondRequest(); // 发送第二个请求
        }*/
      }
    }
    } else {
      console.error('Unexpected data structure:', data);
      const errorMessage = this.createChatBotMessage('error data structure is unexpected');
      this.setChatbotMessage(errorMessage);
    }
  } catch (error) {
    console.error('Error fetching data from server:', error);
    const errorMessage = this.createChatBotMessage(`error：${error.message}`);
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