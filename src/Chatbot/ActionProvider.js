import { SessionsClient } from '@google-cloud/dialogflow-cx';

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
   this.dialogflowClient = new SessionsClient();
 }

 async handleUserInput(userInput) { //using dialogflow
  const sessionId = Math.random().toString(36).substring(7);
  const sessionPath = this.dialogflowClient.projectLocationAgentSessionPath(
    'yufantest-bmqj',//project id
    'global',//location
    '6f2db33e-1f23-462d-a8c8-a5a4adf1f21d',//agentid
    sessionId//sessionid
  );
  const languageCode = 'en'; 
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userInput,
      },
      languageCode,
    },
  };
  const [response] = await this.dialogflowClient.detectIntent(request);

  // process response
  for (const message of response.queryResult.responseMessages) {
    if (message.text) {
      const botReply = message.text.text;
      const chatMessage = this.createChatBotMessage(botReply);

      // Refresh the chat interface
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, chatMessage],
      }));
    }
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

 setChatbotMessage=(message)=>{
  this.setState(state=>({...state,messages:[...state.messages,message]}))
 }
}


export default ActionProvider;