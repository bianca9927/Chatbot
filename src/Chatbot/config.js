import React from "react";
//import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "../component/ChatbotAvatar";
import Todos from '../component/Todos/Todos' ;
 

const config = {
  botName:"PriChat",
  initialMessages: [],//for dialogflow
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
    }
  ],

};


export default config

