let geminiCounter = 1;

const geminiProvider = (model, prompt) => {
    const responseId = `openai_response_${String(geminiCounter).padStart(3, "0")}`;
    geminiCounter++;
    return {
      provider: "gemini",
      model,
      response: `Gemini: Your request has been processed using state-of-the-art AI capabilities. Response ID: ${responseId}`
    };
};
  
module.exports = geminiProvider;
  