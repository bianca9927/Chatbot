class MessageParser{
  constructor(actionProvider,state){
    this.actionProvider=actionProvider;
    this.state=state;
  }
parse(message){ //take message to help chatbot what can it do in next step
    console.log(message)
    console.log("parse is running.");
    const loweracse=message.toLowerCase()
    console.log(this.state)
    if(loweracse.includes("hello world")){
      this.actionProvider.helloWorldHandler()
    }else if(loweracse.includes("todos")){
      this.actionProvider.todoHandler();
    }else{
      this.actionProvider.handleUserInput();
    }
    
}
}
export default MessageParser;

