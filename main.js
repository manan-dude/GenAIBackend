const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); 
app.use(cors())
const port = 3001;


const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get('/', (req, res) => {
   
  res.send('Hello from Express!');
});

app.post('/generate', async (req, res) => {
    try {
        const prompt = req.body.prompt + "give percentage of fake news ";
        
    
        // Check if prompt exists in the request body
        if (!prompt) {
          return res.status(400).json({ error: 'Missing prompt in request body' });
        }
    
        const result = await model.generateContent([prompt]);
        const responseText = result.response.text();
    
        // Extract the percentage from the response text (adjust regex as needed)
        const match = responseText.match(/(\d+(\.\d+)?)%/);
        const percentage = match ? match[0] : null;
    
        res.json({ response: responseText, percentage });
      } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: 'An error occurred' });
      }
  });

  app.post('/fraud-detect', async (req, res) => {
    try {
        const prompt = req.body.prompt + "is it financial fraud or something give measures for it in short, give warning or awareness";
        
    
        // Check if prompt exists in the request body
        if (!prompt) {
          return res.status(400).json({ error: 'Missing prompt in request body' });
        }
    
        const result = await model.generateContent([prompt]);
        const responseText = result.response.text();
    
        // Extract the percentage from the response text (adjust regex as needed)
        const match = responseText.match(/(\d+(\.\d+)?)%/);
        const percentage = match ? match[0] : null;
    
        res.json({ response: responseText, percentage });
      } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: 'An error occurred' });
      }
  });
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
