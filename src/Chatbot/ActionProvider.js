import React from 'react';
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
    console.log('Fetching response for message:', message);

    // Make a request to the backend server to get a response from the Dialogflow API
    const response = await fetch(`http://34.42.20.237:3000/detect-intent?queryText=${encodeURIComponent(message)}`);
  
    const data = await response.json();
    console.log('response in frontend:', data);

    if (data && data.queryResult && data.queryResult.responseMessages) {
      const responseMessages = data.queryResult.responseMessages;
      const messages = []; // save all msg

      for (const message of responseMessages) {
        if (message.text && message.text.text.length > 0) {
          // text msg
          console.log('Intent Response:', message.text.text[0]);
          const textMessage = this.createChatBotMessage(message.text.text[0]);
          messages.push(textMessage);
        }
        if (message.payload && message.payload.text && message.payload.text.length > 0) {
          const textMessages = message.payload.text;
          
          textMessages.forEach((text) => {
            const textMessage = this.createChatBotMessage(text);
            messages.push(textMessage);
          });
        }
        
        if (message.payload && message.payload.image) {
          // image info
          const { imageUrl, accessibilityText } = message.payload.image;
          console.log("json：", imageUrl, accessibilityText);
          const imageMessage = this.createChatBotMessage(
            <img src={imageUrl} alt={accessibilityText} style={{maxWidth: '400px', maxHeight: '200px', width: '100%',height: 'auto'}}/>      
          );
          messages.push(imageMessage);

          if (React.isValidElement(imageMessage)) {
          } else {
            console.error('NOT valid react component:', imageMessage);
          }
        }
      }

      for (const msg of messages) {
        this.setChatbotMessage(msg);
      }
    } else {
      console.error('Unexpected data structure:', data);
      const errorMessage = this.createChatBotMessage('Sorry, I can not parse your data. Could you refresh shopping website and reopen me?');
      this.setChatbotMessage(errorMessage);
    }
  } catch (error) {
    console.error('Error fetching data from server:', error);
    const errorMessage = this.createChatBotMessage(`I don't know how to find products on all websites yet. Please follow the study instructions so that I am able to show you what I'm able to do😊`);
    this.setChatbotMessage(errorMessage);
  }
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