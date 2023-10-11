import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: "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",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const userMessage: string = req.body.message;

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: userMessage}
      ],
      max_tokens: 100,
    });    

    res.json({ answer: openaiResponse.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
