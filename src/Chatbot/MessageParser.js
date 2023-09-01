//import { sendMessageToDialogflow } from '../component/AI/dialogflowClient';
class MessageParser{
  constructor(actionProvider,state){
    this.actionProvider=actionProvider;
    this.state=state;
    
  }
async parse(message){ //take message to help chatbot what can it do in next step
    console.log(message)
    console.log("parse is running.");
    
    const lowercase=message.toLowerCase();
   /* console.log(this.state)*/
    if(lowercase.includes("hello world")){// just an example
      this.actionProvider.helloWorldHandler()
    }else if(lowercase.includes("todos")){
      this.actionProvider.todosHandler();//just an example
    }else{
   this.actionProvider.fetchDialogflowResponse(lowercase);
    }
}
}
export default MessageParser;

