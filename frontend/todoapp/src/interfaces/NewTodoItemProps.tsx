import type { TodoItem } from "./TodoItem";

export interface NewTodoItemProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: (todo: Partial<TodoItem>) => void;
  initialData?: TodoItem; 
}
