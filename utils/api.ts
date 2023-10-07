// Import axios for making HTTP requests
import axios from "axios";

// Define the base URL for JSONPlaceholder
const baseURL = "https://jsonplaceholder.typicode.com";

// Fetch todos from JSONPlaceholder
export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${baseURL}/todos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};
