require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { handleGenerateWithAI } = require("./controllers/ai.controllers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
    })
);

app.get("/test", (req, res) => {
    res.send("This is a test response from the server");
});

app.post("/api/generate-with-ai", handleGenerateWithAI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
