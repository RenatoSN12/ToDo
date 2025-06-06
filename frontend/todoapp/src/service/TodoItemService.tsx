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

export async function createTodoItem(todo: Partial<TodoItem>): Promise<Result> {
  const token = localStorage.getItem('token');

  const response = await axios.post(backendUrl, todo, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export async function patchTodoItem(todo: Partial<TodoItem>): Promise<Result> {
  const token = localStorage.getItem('token');

  const response = await axios.patch(`${backendUrl}/${todo.id}`, todo, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
