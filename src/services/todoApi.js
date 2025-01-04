import { TodoistApi } from "@doist/todoist-api-typescript";

const apiKey =
  import.meta.env.VITE_MY_API_KEY || "42683b58daa0963b444c80d8d102d9758447821d";
console.log(apiKey);

if (!apiKey) {
  console.error("API Key is missing. Please set MY_API_KEY in  .env file.");
}

const api = new TodoistApi(apiKey);

export default api;
