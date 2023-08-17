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
    if(loweracse.includes("i want to know")){
      this.actionProvider.helloWorldHandler()
    }
    if(loweracse.includes("todos")){
      this.actionProvider.todosHandler();
    }
}
}
export default MessageParser;

