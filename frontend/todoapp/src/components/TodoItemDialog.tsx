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
import { DesktopDatePicker } from "@mui/x-date-pickers";
import type { TodoItem } from "../interfaces/TodoItem";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { safeDateFromString } from "../utils/DateHelpers";
import { format } from "date-fns";

interface TodoItemDialogProps {
  open: boolean;
  onClose: () => void;
  onExited: () => void;
  handleSubmit: (todo: Partial<TodoItem>) => void;
  todo: Partial<TodoItem> | null;
  setTodo: React.Dispatch<React.SetStateAction<Partial<TodoItem> | null>>;
}

function TodoItemDialog({
  open,
  onClose,
  onExited,
  handleSubmit,
  todo,
  setTodo,
}: TodoItemDialogProps) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;
    handleSubmit(todo);
    onClose();
  };

  const isEditing = todo?.id != null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        transition: { onExited: onExited },
        paper: {
          sx: {
            borderRadius: 4,
          },
        },
      }}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant="h6">
              {isEditing ? "Editar Tarefa" : "Nova Tarefa"}
            </Typography>
            {isEditing ? (
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
            value={todo?.title ?? ""}
            onChange={(e) =>
              setTodo((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />

          <DesktopDatePicker
            label="Data de Execução"
            value={
              todo?.dueDate ? safeDateFromString(todo.dueDate) : new Date()
            }
            onChange={(newDate) => {
              if (newDate instanceof Date && !isNaN(newDate.getTime())) {
                setTodo((prev) => ({
                  ...prev!,
                  dueDate: format(newDate, "yyyy-MM-dd"),
                }));
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "dense",
              },
            }}
          />
          <TextField
            multiline
            rows={3}
            margin="dense"
            label="Descrição"
            fullWidth
            value={todo?.description ?? ""}
            onChange={(e) =>
              setTodo((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TodoItemDialog;
