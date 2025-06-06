import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { NewTodoItemProps } from "../interfaces/NewTodoItemProps";
import { useState } from "react";

function NewTodoItemDialog({open, onClose, handleSubmit, initialData}: NewTodoItemProps){
    
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [dueDate, setDueDate] = useState<Date | null>(initialData?.dueDate ? new Date(initialData.dueDate) : new Date())

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>{initialData ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewTodoItemDialog