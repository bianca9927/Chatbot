class ActionProvider {
  constructor(
   createChatBotMessage,
   setStateFunc,
   createClientMessage,
   stateRef,
   createCustomMessage,
   ...rest
 ) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
   this.createClientMessage = createClientMessage;
   this.stateRef = stateRef;
   this.createCustomMessage = createCustomMessage;
   
 }
 async fetchDialogflowResponse(message) {
  try {
    // Make a request to the backend server to get a response from the Dialogflow API
    const response = await fetch(`http://localhost:3000/detect-intent?queryText=${encodeURIComponent(message)}`);
    const data = await response.json();
    console.log('响应数据',data);
    // Check if the object is defined before accessing the text property
    if (data && data.queryResult && data.queryResult.text) {
      // send response in chat
      const intentResponse = data.queryResult.text; 
      const chatBotMessage = this.createChatBotMessage(intentResponse);
      this.setChatbotMessage(chatBotMessage);
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