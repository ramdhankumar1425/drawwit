const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getGenerateWithAIPrompt } = require("../prompts");

const handleGenerateWithAI = async (req, res) => {
    console.log("Generating with AI...");

    try {
        const { currCanvas, userQuery } = req.body;

        if (!currCanvas || !userQuery) {
            return res.status(400).json({
                result: null,
                message: "Current canvas state and user query is required",
            });
        }

        const generateWithAIPrompt = getGenerateWithAIPrompt(
            currCanvas,
            userQuery
        );

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let response = await model.generateContent(generateWithAIPrompt);

        console.log("Response:", response.response.text());

        const match = response.response
            .text()
            .match(/<result>([\s\S]*?)<\/result>/);

        let result = new Function(`return ${match[1].trim()}`)();

        console.log("Result:", result);

        res.status(200).json({
            result: result,
            message: "Generated with AI successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    handleGenerateWithAI,
};
