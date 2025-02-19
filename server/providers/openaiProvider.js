let openaiCounter = 1;

const openaiProvider = (model, prompt) => {
    const responseId = `openai_response_${String(openaiCounter).padStart(3, "0")}`;
    openaiCounter++;
    return {
      provider: "openai",
      model,
      response: `OpenAI: Processed your prompt with advanced language understanding. Response ID: ${responseId}`
    };
};
  
module.exports = openaiProvider;
  