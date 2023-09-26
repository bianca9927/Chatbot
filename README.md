INTRODUCTION
PriChat is a chatbot extension for helping users learn privacy-relevant information of IoT devices during online shopping. We create a chatbot extension framework and used Dialogflow CX to make AI smart. Our privacy-relevant information came from the content from Mozilla's privacyNOTincluded as privacy topics.

NEXT STEP?
This chatbot extension can run on Edge and Chrome. 
- If you want to use this extension. You can upload the build folder in both browser under develop mode of extension.
- If you want to develop this chatbot extension, you can check HOW TO USE THIS PROJECT.


HOW TO USE THIS PROJECT?
If you want to run the code, please enter in console: npm run build.
This chatbot extension is based on Create React App framework. Public folder is the code related to extension, including manifest.json, content.js, background.js. If you want to change what are shown in popup of extension, you need to modify src folder. Src folder is a react folder, including App.js and chatbot component using NPM package "react-chatbot-kit". If you want to change Dialogflow setting, please connect BiancaLu1227@hotmail.com. Server.js is actually run in GCP VM (remote server). If you want to let others use your extension in their PC, you need to create a server online. I chose GCP VM and uploaded server.js in this platform. 
PS: privacy1.png, privacy2.png, privacy3.png are the screenshot from Mozilla's privacyNOTincluded that we used in Dialogflow payload

USEFUL TUTORIALS?
1. Creat React App:  https://create-react-app.dev/docs/getting-started
2. React-chatbot-kit: https://www.npmjs.com/package/react-chatbot-kit (Youtube video: https://youtube.com/playlist?list=PL_kr51suci7UQAxHOF2GitkM5WrOBPcpf&si=u5PIVuufJTVz3fdV)
3. Dialogflow CX offical tutorials
4. Google Extension offical tutorials


Created by Yufan Lu, HCI, MS.C, LMU (University of Munich), 27.09.2023