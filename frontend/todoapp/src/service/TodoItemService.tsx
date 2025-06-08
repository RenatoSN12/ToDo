import type { Result } from "../interfaces/Result";
import type { TodoItem } from "../interfaces/TodoItem";
import axios from "axios";

const backendUrl = import.meta.env.VITE_API_URL;

export const getTodoItemsByDate = async (date: string): Promise<Result<TodoItem[]>> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${backendUrl}/tasks?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export async function createTodoItem(todo: Partial<TodoItem>): Promise<Result<TodoItem>> {
  const token = localStorage.getItem('token');

  const response = await axios.post(`${backendUrl}/tasks`, todo, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export async function patchTodoItem(todo: Partial<TodoItem>): Promise<Result<TodoItem>> {
  const token = localStorage.getItem('token');

  const response = await axios.patch(`${backendUrl}/tasks/${todo.id}`, todo, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export async function completeTodoItem(todoIds: string[]): Promise<Result<TodoItem[]>> {
  const token = localStorage.getItem('token');

  const response = await axios.patch(`${backendUrl}/tasks/complete`, { ids: todoIds },{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data;
}

export async function deleteTodoItem(todoId: string) : Promise<Result> {
  const token = localStorage.getItem('token');

  const response = await axios.delete(`${backendUrl}/tasks/${todoId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data;
}
