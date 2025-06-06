import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import type { TodoItem } from "../interfaces/TodoItem";
import { format } from "date-fns";
import { stringToDate } from "../utils/DateHelpers";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface SaveTodoItemProps {
  open: boolean;
  onClose: () => void;
  onExited: () => void;
  handleSubmit: (todo: Partial<TodoItem>) => void;
  todo?: TodoItem | null
}
function TodoItemDialog({open,onClose, onExited, handleSubmit,todo}: SaveTodoItemProps) {
  
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [completedAt, setCompletedAt] = useState<Date | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
      setTitle(todo?.title ?? "");
  
      const dueDate = stringToDate(todo?.dueDate);
      setDueDate(dueDate);
  
      const completedAt = stringToDate(todo?.completedAt);
      setCompletedAt(completedAt);
  
      setDescription(todo?.description ?? "");
  
      setIsCompleted(todo?.isCompleted ?? false);
  }, [open]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

      handleSubmit({
        title,
        description,
        dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : "",
      });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        transition: {
          onExited: () => {
            onExited();
          },
        },
      }}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant="h6">
              {todo ? "Editar Tarefa" : "Nova Tarefa"}
            </Typography>
            {todo ? (
              <EditIcon color="primary" />
            ) : (
              <AddCircleIcon color="success" />
            )}
          </Stack>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <DatePicker
            label="Data de Execução"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "dense",
              },
            }}
          />
          <TextField
            autoFocus
            multiline
            rows={3}
            margin="dense"
            label="Descrição"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TodoItemDialog;
