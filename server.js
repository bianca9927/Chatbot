const express = require('express');
const memoryCache = require('memory-cache');
const request = require('request-promise');
const cheerio = require('cheerio');
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const corsOptions = {
  origin: ['https://item.taobao.com/item*','chrome-extension://cbhidmgkkaobaeabjdfnmcloldgpmpan'], // 允许的来源
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
  credentials: true, // 允许发送凭据（如 Cookies）
};



const app = express();
const port = process.env.PORT || 3000;
const serviceAccountKey = JSON.parse(process.env.REACT_APP_SERVICE_ACCOUNT_KEY);
console.log(serviceAccountKey);
const buildPath=path.join(__dirname,'build');
app.use(cors(corsOptions));
app.use(express.static(buildPath));
app.use(express.json());

// 生成一个随机的 session ID
const sessionId = Math.random().toString(36).substring(2, 15) + '-' + Math.random().toString(36).substring(2, 15);

// 在服务器的全局变量中存储 session ID
app.set('sessionId', sessionId);


/*async function sendProductInfoToDialogflow(productInfo) {
  // 在这里实现将 productInfo 发送给 Dialogflow 的逻辑
  // 返回 Dialogflow 的响应
  // 你的逻辑可以参考之前的 detectIntent 函数
  const auth = new GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  console.log('prepared to catch auth client');
  const client = await auth.getClient();
  console.log('catched auth client');
  const projectId = 'yufantest-bmqj';
  const agentId='6f2db33e-1f23-462d-a8c8-a5a4adf1f21d';
  let request;
  console.log('prepared to access token');
  try {
    const accessTokenResponse = await client.getAccessTokenAsync();
    const accessToken = accessTokenResponse.token;
    console.log('sessionid:',sessionId);
    console.log('catched access token：', accessToken);
    console.log("session id in product-info:",sessionId);
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
            "text": productInfo
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
}*/

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
  const agentId='6f2db33e-1f23-462d-a8c8-a5a4adf1f21d';
  let request;
  console.log('prepared to access token');
  try {
    const accessTokenResponse = await client.getAccessTokenAsync();
    const accessToken = accessTokenResponse.token;
    console.log('sessionid:',sessionId);
    console.log('catched access token：', accessToken);
    console.log("session id in detect-intent:",sessionId);
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

app.get('/get-privacy-data', (req, res) => {
  // 上传图片的路径
  console.log("into route get-privacy-data")
  const imagePath = 'policy_data.jpg';

  // 使用 fs 模块来读取图片
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error('Error reading image:', err);
      res.status(500).send('Error reading image');
    } else {
      // 设置响应头，指定返回的内容类型为图片
      res.setHeader('Content-Type', 'image/jpeg');
      // 将图片数据发送给客户端
      res.send(data);
    }
  });
});

/*app.get('/send-product-info-to-dialogflow', async (req, res) => {
  console.log("get request from actionprovider");
  try {
    // 从内存缓存中检索产品信息，使用 sessionId 作为键
    const productInfo = memoryCache.get('productInfo');
    console.log("接收到回复，把产品名称发回 Dialogflow");
   
    if (productInfo) {
      // 在这里将 productInfo 发送给 Dialogflow， from actionprovider request
      const dialogflowResponse = await sendProductInfoToDialogflow(productInfo);
      // 返回 Dialogflow 的响应给 ActionProvider
     
    
      res.json(dialogflowResponse);

    } else {
      res.status(404).json({ message: 'Product info not found' });
    }
  } catch (error) {
    console.error('Error sending product info to Dialogflow:', error);
    res.status(500).json({ message: error.message });
  }
});
app.get('/get-product-name', async (req, res) => {
  console.log("show the product name in extension");
  try {
    // 从内存缓存中检索产品信息，使用 sessionId 作为键
    const productInfo = memoryCache.get('productInfo');
    console.log("接收到回复，把产品名称发回 Dialogflow");
   
    if (productInfo) {
      res.json(productInfo);

    } else {
      res.status(404).json({ message: 'Product info can not be send' });
    }
  } catch (error) {
    console.error('Error sending product info to extension:', error);
    res.status(500).json({ message: error.message });
  }
});
/* try {
    // 将 productInfo 存储到内存缓存中，使用 sessionId 作为键
    memoryCache.put('productInfo', productInfo);
    console.log("内存缓存已保存");
    res.status(200).json({ message: 'Product info saved successfully' });
  } catch (error) {
    console.error('Error handling product info:', error);
    res.status(500).json({ message: error.message });
  }*/
  /*
  app.get('/save-product-name', async (req, res) => {
    console.log("服务器发送产品名称给 Dialogflow");
    const productInfo = req.body.productInfo; // 从请求中获取产品信息
  
    try {
      console.log("处理来自background请求");
      const dialogflowResponse = await detectIntent(productInfo);
        // 如果成功接收到Dialogflow的响应，将其返回给客户端
        res.json(dialogflowResponse);
        console.log("在服务器接收到的dialogflow的回复是：",dialogflowResponse)
      
    } catch (error) {
      console.error('处理产品信息时出错:', error);
      res.status(500).json({ message: error.message });
    }
  });
  */

  app.post('/send-productinfo-to-dialogflow', async (req, res) => {
    const productinfo = req.body.productInfo;//productinfo
 
    try {
        console.log("processing request in [send-productinfo-to-dialogflow]");
      const data = await detectIntent(productinfo);
      res.json(data);
      console.log('Data returned from detectIntent:', data);
    } catch (error) {
      console.error('Error in detect-intent route:', error);
      res.status(500).json({ message: error.message });
    }
  });
app.get('/detect-intent', async (req, res) => {
    const queryText = req.query.queryText;//user input
    //const sessionId = req.query.sessionId;
    try {
        console.log("processing request");
      const data = await detectIntent(queryText);//send user input
      res.json(data);
      console.log('Data returned from detectIntent:', data);
    } catch (error) {
      console.error('Error in detect-intent route:', error);
      res.status(500).json({ message: error.message });
    }
  });

app.get('*',(req,res)=>{res.sendFile(path.join(buildPath,'index.html'));});

app.listen(port,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
