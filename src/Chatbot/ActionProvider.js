import creaditials from '../dialogflow_creditial.json'
class ActionProvider {
  constructor(
   createChatBotMessage,
   setStateFunc,
   createClientMessage,
   stateRef,
   createCustomMessage,
   sessionClient,
   sessionId,
   ...rest
 ) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
   this.createClientMessage = createClientMessage;
   this.stateRef = stateRef;
   this.createCustomMessage = createCustomMessage;
   this.sessionClient = sessionClient;
  this.sessionId = sessionId;
 }
/* async DialogflowHandler(message) {
  const sessionPath = this.sessionClient.projectAgentSessionPath(creaditials.project_id, this.sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await this.sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    const botReply = result.fulfillmentText;
    const chatMessage = this.createChatBotMessage(botReply);

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, chatMessage],
    }));
  } catch (error) {
    console.error('Error communicating with Dialogflow:', error);
  }
}
*/
 helloWorldHandler=()=>{
  const message=this.createChatBotMessage("Ok! Please just wait a few second.")
  this.setChatbotMessage(message)
 }
todosHandler=()=>{
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