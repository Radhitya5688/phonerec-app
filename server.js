const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Anthropic = require('@anthropic-ai/sdk');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Claude setup
const anthropic = new Anthropic({
  apiKey: process.env.API_KEY,
});

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// AI recommendation route
app.post('/recommend', async (req, res) => {
  try {
    const { budget, usage } = req.body;

    const prompt = `Suggest 3 best smartphones under ₹${budget} for ${usage} usage. 
    Give:
    - Phone name
    - Pros
    - Cons
    - Short explanation`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    res.json({
      success: true,
      result: response.content[0].text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Something went wrong"
    });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});