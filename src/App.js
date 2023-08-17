import React,{useEffect,useState} from 'react';
import {Chatbot} from 'react-chatbot-kit';
import ActionProvider from './Chatbot/ActionProvider';
import MessageParser from './Chatbot/MessageParser';
import config from './Chatbot/config';
/*import { v4 as uuidv4 } from 'uuid';
import creditials from'./dialogflow_creditial.json';
import { SessionsClient } from '@google-cloud/dialogflow';*/

import './App.css';

function App() {
 /* const [sessionClient, setSessionClient] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  useEffect(() => {
    const client = new SessionsClient({
      credentials: {
        client_email: creditials.client_email, 
        private_key: creditials.private_key, 
      },
    });
    const newSessionId = uuidv4();

    setSessionClient(client);
    setSessionId(newSessionId);
  }, []);

  return (
    <div className="App">
     <header className='App-header'>
    <Chatbot config={config} actionProvider={ActionProvider(sessionClient, sessionId)} messageParser={MessageParser}></Chatbot>
    </header>
    </div>
  );
}
*/
return (
  <div className="App">
   <header className='App-header'>
  <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}></Chatbot>
  </header>
  </div>
);
}
export default App;
