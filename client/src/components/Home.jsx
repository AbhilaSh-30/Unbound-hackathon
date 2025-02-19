import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import OpenAIImage from "../assets/openai.png";
import GeminiImage from "../assets/gemini.png";
import AnthropicImage from "../assets/anthropic.png";

const models = [
  { name: "OpenAI", image: OpenAIImage },
  { name: "Gemini", image: GeminiImage },
  { name: "Anthropic", image: AnthropicImage },
];

const ChatPage = ()=> {
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/models`)
      .then((res) => res.json())
      .then((data) => {
        const parsedModels = data.map((model) => {
          const [provider, modelName] = model.split("/");
          return { provider, model: modelName };
        });
        setAvailableModels(parsedModels);
      })
      .catch((err) => console.error("Error fetching models:", err));
  }, []);

  const handleSubmit = async () => {
    if (!selectedProvider || !selectedModel || !prompt) return;

    const requestBody = {
      provider: selectedProvider,
      model: selectedModel,
      prompt,
    };

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}api/v1/chat/completions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await res.json();
    setResponse(data.response.response);
  };

  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 via-blue-900 to-black text-white p-6"
    >

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">Chat with AI</h1>

      {/* Model Selection */}
      <div className="flex gap-6 mb-6">
        {models.map((model) => (
          <div key={model.name} className="flex flex-col items-center">
            <img
              src={model.image}
              alt={model.name}
              className="w-20 h-20 mb-2 rounded-full shadow-lg border-2 border-gray-700"
            />
            <p className="text-lg font-semibold">{model.name}</p>
          </div>
        ))}
      </div>

      {/* Chat Controls */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Provider</option>
          {[...new Set(availableModels.map((m) => m.provider))].map((provider) => (
            <option key={provider} value={provider}>{provider}</option>
          ))}
        </select>

        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Model</option>
          {availableModels.filter((m) => m.provider === selectedProvider).map((model) => (
            <option key={model.model} value={model.model}>{model.model}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 p-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition shadow-md"
        >
          Send <FaPaperPlane />
        </button>
      </div>

      {/* Response */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gray-800 p-5 rounded-lg shadow-lg w-full max-w-md border border-gray-700"
        >
          <p className="text-lg">{response}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ChatPage;