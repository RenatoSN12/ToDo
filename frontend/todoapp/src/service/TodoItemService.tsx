import type { Result } from "../interfaces/Result";
import type { TodoItem } from "../interfaces/TodoItem";
import axios from "axios";

const backendUrl = "http://localhost:5052/api/tasks";

export const getTodoItemsByDate = async (date: string): Promise<Result<TodoItem[]>> => {
  const token = localStorage.getItem("token");

  //http://localhost:5052/api/tasks?date=yyyy-MM-dd

  const response = await axios.get(`${backendUrl}?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
