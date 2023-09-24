import React from 'react';
import {Chatbot} from 'react-chatbot-kit';
import ActionProvider from './Chatbot/ActionProvider';
import MessageParser from './Chatbot/MessageParser';
import config from './Chatbot/config';


import './App.css';


function App() {
  return (
    
    <div className="App">
     <header className='App-header'>
    <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}></Chatbot>
    </header>
    </div>
  );
}



export default App;