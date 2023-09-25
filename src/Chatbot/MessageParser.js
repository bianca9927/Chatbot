class MessageParser{
  constructor(actionProvider,state){
    this.actionProvider=actionProvider;
    this.state=state;
    
  }
async parse(message){ //take message to help chatbot what can it do in next step
    console.log(message)
    console.log("parse is running.");
    const lowercase=message.toLowerCase();
    this.actionProvider.fetchDialogflowResponse(lowercase);
}



}

export default MessageParser;

