import { TodoistApi } from "@doist/todoist-api-typescript";

const apiKey = import.meta.env.VITE_MY_API_KEY;
console.log(apiKey);

if (!apiKey) {
  console.error("API Key is missing. Please set MY_API_KEY in  .env file.");
}

const api = new TodoistApi(apiKey);

export default api;
