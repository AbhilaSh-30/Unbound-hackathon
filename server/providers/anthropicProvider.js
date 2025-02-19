let anthropicCounter = 1;

const anthropicProvider = (model, prompt) => {
    const responseId = `openai_response_${String(anthropicCounter).padStart(3, "0")}`;
    anthropicCounter++;
    return {
      provider: "anthropic",
      model,
      response: `Anthropic: Your prompt has been interpreted with ethical AI principles. Response ID: ${responseId}`
    };
};
  
module.exports = anthropicProvider;
  