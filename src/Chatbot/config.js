import React from "react";
//import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "../component/ChatbotAvatar";
import Todos from '../component/Todos/Todos' ;
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser"; 

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
  //Following is only for dialogflow API
  actionProvider: new ActionProvider(), 
  messageParser: new MessageParser(), 
};


export default config

