const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const serviceAccountKey = JSON.parse(process.env.REACT_APP_SERVICE_ACCOUNT_KEY);
console.log(serviceAccountKey);
const buildPath=path.join(__dirname,'build');
app.use(cors());
app.use(express.static(buildPath));

async function detectIntent(queryText) {
    console.log('beginning to run detectIntent function');
  const auth = new GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  console.log('prepared to catch auth client');
  const client = await auth.getClient();
  console.log('catched auth client');
  const projectId = 'yufantest-bmqj';
  const sessionId = Math.random().toString(36).substring(7);
  const agentId='6f2db33e-1f23-462d-a8c8-a5a4adf1f21d';
  let request;
  console.log('prepared to access token');
  try {
    const accessTokenResponse = await client.getAccessTokenAsync();
    const accessToken = accessTokenResponse.token;
    console.log('catched access token：', accessToken);
    const url=`https://dialogflow.googleapis.com/v3/projects/${projectId}/locations/global/agents/${agentId}/sessions/${sessionId}:detectIntent`;
  
    console.log('prepared to request object');
    request = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify({
        "queryInput": {
          "text": {
            "text": queryText
          },
          "languageCode": "en"
        },
        "queryParams": {
          "timeZone": "America/Los_Angeles"
        }
      }),
      };
    console.log('had request object：', request);
} catch (error) {
    console.error('error in catching access token：', error);
    return null;
  }
  
 
 
  try {
    console.log('prepared to call Dialogflow API');
    const response = await axios(request);
    console.log('called Dialogflow API，return：', response.data);
    return response.data;
  } catch (error) {
    console.error('Error calling Dialogflow API:', error);
    return null;
  }
}
app.get('/detect-intent', async (req, res) => {
    const queryText = req.query.queryText;
    try {
        console.log("processing request");
      const data = await detectIntent(queryText);
      console.log('return data from detectIntent:', data);
      res.json(data);
      console.log('Data returned from detectIntent:', data);
    } catch (error) {
      console.error('Error in detect-intent route:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
app.get('*',(req,res)=>{res.sendFile(path.join(buildPath,'index.html'));});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
