import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "../component/ChatbotAvatar";
import Todos from '../component/Todos/Todos' ;
import ImageMessage from '../component/ImageMessage' ;
 

const config = {
  botName:"PriChat",
  initialMessages: [createChatBotMessage(`Hello! I am Prichat! I'm an assistant for your privacy😊`),createChatBotMessage(`Do you want to know the privacy policy of current product on shopping website?`)],//for dialogflow
  //initialMessages:[createChatBotMessage(`Hello! I'm PriChat! How can I help you?`)],
  customComponents:{
    BotAvatar:(props)=><BotAvatar{...props}/>
  },
  customStyles:{
    
    botMessageBox:{
      backgroundColor:"green",
    },
    chatButton:{
      backgroundColor:"green",
    },
  },
  state:{ 
    todos:[]
  },
  widgets:[
    {
      widgetName:"todos",
      widgetFunc:(props)=><Todos {...props}/>,
      mapStateToProps:["todos"],
    },
    {
      widgetName: "imageMessage",
      widgetFunc: (props) => <ImageMessage {...props} />,
      props: ['imageUrl', 'imageAlt'], 
    },
  ],

};


export default config

