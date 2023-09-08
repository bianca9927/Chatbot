class ActionProvider {
  constructor(
   createChatBotMessage,
   setStateFunc,
   createClientMessage,
   stateRef,
   createCustomMessage,
   sessionId,
   ...rest
 ) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
   this.createClientMessage = createClientMessage;
   this.stateRef = stateRef;
   this.createCustomMessage = createCustomMessage;
   //this.sessionId=Math.random().toString(36).substring(7);
   this.sessionId=Math.random().toString(36).substring(2, 15) + '-' + Math.random().toString(36).substring(2, 15);

 }
 async fetchDialogflowResponse(message) {
  
  try {
    console.log('Fetching response for message:', message);
    console.log('sessionid:', this.sessionId);
    // Make a request to the backend server to get a response from the Dialogflow API
  
    const response = await fetch(`http://localhost:3000/detect-intent?queryText=${encodeURIComponent(message)}&sessionId=${this.sessionId}`);
    const data = await response.json();
    console.log('response in frontend:',data);
    // Check if the object is defined before accessing the text property
    if (data && data.queryResult && data.queryResult.responseMessages) {
      // send response in chat
      const responseMessages = data.queryResult.responseMessages;
      responseMessages.forEach((message) => {
        if (message.text && message.text.text.length > 0) {
          console.log('Intent Response:', message.text.text[0]);
          const intentResponse = message.text.text[0];
          const chatBotMessage = this.createChatBotMessage(intentResponse);
          this.setChatbotMessage(chatBotMessage);
        }
      });
    } else {
      console.error('Unexpected data structure:', data);
      const errorMessage = this.createChatBotMessage(`error data structure is unexpected`);
      this.setChatbotMessage(errorMessage);
    }
  } catch (error) {
    console.error('Error fetching data from server:', error);
    const errorMessage = this.createChatBotMessage(`error：${error.message}`);
    this.setChatbotMessage(errorMessage);
  }
}


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