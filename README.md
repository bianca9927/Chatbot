![image](https://github.com/bianca9927/Chatbot/assets/57630575/abf2bc9e-439a-4d37-9720-810cf853ff1e)

# Introduction
PriChat is a chatbot extension for helping users learn privacy-relevant information of IoT devices during online shopping. We create a chatbot extension framework used it in Taobao shopping website and used Dialogflow CX to make AI smart. Our privacy-relevant information came from the content from Mozilla's privacyNOTincluded as privacy topics.


# How to use this code?
This chatbot extension can run on Edge and Chrome. 
- If you want to use this extension. You can upload the build folder in both browsers under develop mode of extension. We chose Amazon echo dot from Taobao shopping website. (https://item.taobao.com/item.htm?spm=a21n57.1.0.0.7532523coqeUa7&id=645689272517&ns=1&abbucket=2#detail) You can open this extension when you open this shopping website.
- If you want to develop this chatbot extension, you can check HOW TO DEVELOP BASED ON THIS CODE👇.


# How to develop based on this code?
If you want to run the code or modify it, please enter in console: npm run build. and then build folder will be updated.
This chatbot extension is based on Create React App framework. 
- If you want to change code related to extension, you need to modify public folder. Public folder is the code related to extension, including manifest.json, content.js, background.js, etc.
- If you want to change what are shown in popup of extension, you need to modify src folder. Src folder is a react folder, including App.js and chatbot component using NPM package "react-chatbot-kit".
- If you want to change Dialogflow setting, please modify server.js. and .env file. Please download your service account key and save it in .env and then you need to change projectId and agentId in server.js.
- If you want to use other shopping website, you need to change origin parameter in corsOption in server.js. Also, we used DOM parameter from Taobao shopping website, so if you want to use other shopping website, you need to change name of DOM parameter in public folder.
- Server.js is actually run in GCP VM (remote server). If you want to let others use your extension in their PC, you need to create a server online. I chose GCP VM and uploaded server.js in this platform. Please don't forget to change serverURL in each file where you want to communicate with your server. However, you can also test server.js locally, you can change url to localhost:3000.
PS: privacy1.png, privacy2.png, privacy3.png are the screenshot from Mozilla's privacyNOTincluded that we used in Dialogflow payload function

# Useful tutorials
1. Creat React App:  https://create-react-app.dev/docs/getting-started
2. React-chatbot-kit: https://www.npmjs.com/package/react-chatbot-kit (Youtube video: https://youtube.com/playlist?list=PL_kr51suci7UQAxHOF2GitkM5WrOBPcpf&si=u5PIVuufJTVz3fdV)
3. Dialogflow CX offical tutorials
4. Google Extension offical tutorials


Created by Yufan Lu, HCI, M.Sc, LMU (University of Munich), 27.09.2023
