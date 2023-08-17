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