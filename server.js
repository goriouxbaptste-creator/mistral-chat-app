require("dotenv").config();

const path = require("path");
const express = require("express");
const { Mistral } = require("@mistralai/mistralai");

const app = express();
const port = process.env.PORT || 3000;

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  console.error("Missing MISTRAL_API_KEY environment variable.");
  process.exit(1);
}

const client = new Mistral({ apiKey });

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages,
    });

    const reply = chatResponse.choices?.[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ error: err.message || "Mistral API error" });
  }
});

app.listen(port, () => {
  console.log(`Mistral chat app listening on http://localhost:${port}`);
});
