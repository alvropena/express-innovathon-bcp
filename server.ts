import express, { Request, Response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

// Now you can use your API key as follows:
const openaiApiKey = process.env.OPENAI_API_KEY;

const app = express();
app.use(bodyParser.json());

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const userMessage: string = req.body.message;

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        prompt: userMessage,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    const systemMessage: string = openaiResponse.data.choices[0].text.trim();

    res.json({ answer: systemMessage });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
