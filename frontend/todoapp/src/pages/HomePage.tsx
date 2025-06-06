import { useEffect, useState } from "react";
import type { TodoItem } from "../interfaces/TodoItem";
import { Box, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Grid from "../components/Grid";
import NewTodoItemDialog from "../components/TodoItemDialog";
import { createTodoItem, getTodoItemsByDate, patchTodoItem } from "../service/TodoItemService";
import { enqueueSnackbar } from "notistack";
import type { AxiosError } from "axios";
import { SplitErrors } from "../utils/StringSpliter";
import { format } from "date-fns";

function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todoBeingEdited, setTodoBeingEdited] = useState<TodoItem | null>(null);

  const handleEdit = (todo: TodoItem) => {
    setTodoBeingEdited(todo);
    setDialogOpen(true);
  };

  useEffect(() => {
    loadTodos();
  }, [date]);

  const loadTodos = async () => {
    try {
      const dateFormatted = format(date ?? new Date(), "yyyy-MM-dd");
      var result = await getTodoItemsByDate(dateFormatted);
      setTodos(result.data ?? []);
    } catch {
      setTodos([]);
    }
  };

  const handleSubmit = async(todo: Partial<TodoItem>) => {
    try {
      const isEditing = todoBeingEdited?.id != null;
      const acao = isEditing ? "atualizada" : "criada"

      if(isEditing){
        await patchTodoItem(todoBeingEdited);
      }else{
        await createTodoItem(todo)
      }
      
      enqueueSnackbar(`Tarefa ${acao} com sucesso!`, {variant: "success"})
      setDialogOpen(false)
    } catch (err:any) {
      const axiosErr = err as AxiosError<{ message: string }>;
      const errors = SplitErrors(axiosErr.response?.data?.message);
      errors.forEach((error) => enqueueSnackbar(error, { variant: "error" }));
    }
  }

  return (
    <Box mt={4}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: { xs: 200, sm: 700 } }}
          gutterBottom
        >
          Tarefas do Dia
        </Typography>

        <DatePicker
          label="Selecionar data"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{ textField: { size: "small" } }}
        />

        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Nova Tarefa
        </Button>
      </Box>

      <Grid
        todos={todos}
        onEdit={handleEdit}
      ></Grid>

      <NewTodoItemDialog
        open={dialogOpen}
        onClose={() => {setDialogOpen(false)}}
        handleSubmit={handleSubmit}
        todo={todoBeingEdited}
        onExited= {() =>{setTodoBeingEdited(null)}}
      />
    </Box>
  );
}

export default HomePage;
